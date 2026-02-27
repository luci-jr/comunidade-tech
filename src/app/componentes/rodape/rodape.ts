import { Component, OnInit, inject } from '@angular/core';
import { FirestoreService } from '../../servicos/firestore.service';

@Component({
  selector: 'app-rodape',
  standalone: true,
  imports: [],
  templateUrl: './rodape.html',
  styleUrl: './rodape.css',
})
export class Rodape implements OnInit {
  private firestoreService = inject(FirestoreService);

  viewsDiarias = '0';
  contadorDisponivel = true;

  async ngOnInit(): Promise<void> {
    await this.carregarViewsDiarias();
  }

  private async carregarViewsDiarias(): Promise<void> {
    try {
      await this.firestoreService.incrementarViewDiariaSeNecessario();
      const totalViews = await this.firestoreService.obterViewsDiarias();
      this.viewsDiarias = totalViews.toLocaleString('pt-BR');
    } catch {
      this.contadorDisponivel = false;
    }
  }
}
