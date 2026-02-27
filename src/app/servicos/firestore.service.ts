import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  getDoc,
  runTransaction
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface SugestaoPlataforma {
  nome: string;
  url: string;
  dataSugerida: Date;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore = inject(Firestore);
  private readonly contadorCollection = 'metricas-diarias';
  private readonly chaveViewLocal = 'ct_last_daily_view';

  enviarSugestao(sugestao: SugestaoPlataforma) {
    const sugestoesCol = collection(this.firestore, 'sugestoes');
    return addDoc(sugestoesCol, {
      ...sugestao,
      dataSugerida: new Date().toISOString()
    });
  }

  listarSugestoes(): Observable<SugestaoPlataforma[]> {
    const sugestoesCol = collection(this.firestore, 'sugestoes');
    return collectionData(sugestoesCol) as Observable<SugestaoPlataforma[]>;
  }

  async incrementarViewDiariaSeNecessario(): Promise<void> {
    const hojeId = this.getDataLocal();
    const ultimoDiaRegistrado = this.safeGetLocalStorage(this.chaveViewLocal);

    if (ultimoDiaRegistrado === hojeId) {
      return;
    }

    const contadorRef = doc(this.firestore, this.contadorCollection, hojeId);

    await runTransaction(this.firestore, async (transaction) => {
      const snapshot = await transaction.get(contadorRef);
      const viewsAtuais = snapshot.exists() ? Number(snapshot.data()['views'] ?? 0) : 0;

      transaction.set(
        contadorRef,
        {
          views: viewsAtuais + 1,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    });

    this.safeSetLocalStorage(this.chaveViewLocal, hojeId);
  }

  async obterViewsDiarias(): Promise<number> {
    const hojeId = this.getDataLocal();
    const contadorRef = doc(this.firestore, this.contadorCollection, hojeId);
    const snapshot = await getDoc(contadorRef);

    if (!snapshot.exists()) {
      return 0;
    }

    return Number(snapshot.data()['views'] ?? 0);
  }

  private getDataLocal(): string {
    return new Date().toLocaleDateString('sv-SE');
  }

  private safeGetLocalStorage(chave: string): string | null {
    try {
      return localStorage.getItem(chave);
    } catch {
      return null;
    }
  }

  private safeSetLocalStorage(chave: string, valor: string): void {
    try {
      localStorage.setItem(chave, valor);
    } catch {
      // Ignora indisponibilidade de storage para nao quebrar a navegacao.
    }
  }
}
