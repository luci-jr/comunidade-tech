import { Component, Input } from '@angular/core';
import { SistemaOperacional } from '../../../models/sistema-operacional.model';

@Component({
  selector: 'app-sistemas-operacionais-trilha',
  standalone: true,
  templateUrl: './sistemas-operacionais-trilha.html',
  styleUrl: './sistemas-operacionais-trilha.css',
})
export class SistemasOperacionaisTrilha {
  @Input({ required: true }) titulo!: string;
  @Input({ required: true }) descricao!: string;
  @Input({ required: true }) iconeTitulo!: string;
  @Input({ required: true }) recursos!: SistemaOperacional[];
}
