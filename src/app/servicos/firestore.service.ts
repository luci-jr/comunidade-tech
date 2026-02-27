import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData
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
}
