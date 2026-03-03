import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginModalService {
  private _exibir = signal(false);
  
  readonly exibir = this._exibir.asReadonly();

  abrir() {
    this._exibir.set(true);
  }

  fechar() {
    this._exibir.set(false);
  }
}
