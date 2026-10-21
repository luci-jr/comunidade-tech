import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  increment,
  query,
  orderBy,
  limit
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MensagemMural } from '../models/mural.model';

export interface SugestaoPlataforma {
  id?: string;
  nome: string;
  url: string;
  dataSugerida?: string | Date;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore = inject(Firestore);

  // --- MURAL DOS DEVS ---
  listarMensagensMural(): Observable<MensagemMural[]> {
    const muralCol = collection(this.firestore, 'mural');
    const q = query(muralCol, orderBy('dataCriacao', 'desc'), limit(50));
    return collectionData(q, { idField: 'id' }) as Observable<MensagemMural[]>;
  }

  enviarMensagemMural(mensagem: Omit<MensagemMural, 'id'>) {
    const muralCol = collection(this.firestore, 'mural');
    return addDoc(muralCol, {
      ...mensagem,
      dataCriacao: new Date().toISOString(),
      curtidas: 0
    });
  }

  curtirMensagemMural(id: string) {
    const docRef = doc(this.firestore, `mural/${id}`);
    return updateDoc(docRef, {
      curtidas: increment(1)
    });
  }

  // --- SUGESTÕES DE PLATAFORMAS ---
  enviarSugestao(sugestao: SugestaoPlataforma) {
    const sugestoesCol = collection(this.firestore, 'sugestoes');
    return addDoc(sugestoesCol, {
      nome: sugestao.nome,
      url: sugestao.url,
      dataSugerida: new Date().toISOString()
    });
  }

  listarSugestoes(): Observable<SugestaoPlataforma[]> {
    const sugestoesCol = collection(this.firestore, 'sugestoes');
    const q = query(sugestoesCol, orderBy('dataSugerida', 'desc'), limit(30));
    return collectionData(q, { idField: 'id' }) as Observable<SugestaoPlataforma[]>;
  }
}
