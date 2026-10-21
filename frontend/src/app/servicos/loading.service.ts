import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = signal<boolean>(false);
  message = signal<string>('CARREGANDO AVENTURA...');

  private messages = [
    'PREPARANDO ASSETS...',
    'CONFIGURANDO TRILHAS...',
    'ESCALANDO SERVIDORES...',
    'RECOLHENDO MOEDAS...',
    'CARREGANDO CONHECIMENTO...',
    'DESVENDANDO CÓDIGOS...',
    'SINCRONIZANDO DADOS...',
    'INICIANDO JORNADA TECH...'
  ];

  private returnMessages = [
    'RETORNANDO AO NÚCLEO...',
    'SALVANDO PROGRESSO...',
    'DESCOMPRIMINDO DADOS...',
    'VOLTANDO AO DASHBOARD...',
    'RECARREGANDO HUB...'
  ];

  show() {
    const randomMsg = this.messages[Math.floor(Math.random() * this.messages.length)];
    this.message.set(randomMsg);
    this.isLoading.set(true);
  }

  showReturning() {
    console.log('LoadingService: Ativando loading de retorno');
    const randomMsg = this.returnMessages[Math.floor(Math.random() * this.returnMessages.length)];
    this.message.set(randomMsg);
    this.isLoading.set(true);
  }

  hide() {
    this.isLoading.set(false);
  }
}
