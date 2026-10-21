import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { SistemaOperacional } from '../../../models/sistema-operacional.model';

@Component({
  selector: 'app-sistemas-operacionais-trilha',
  standalone: true,
  templateUrl: './sistemas-operacionais-trilha.html',
  styleUrl: './sistemas-operacionais-trilha.css',
})
export class SistemasOperacionaisTrilha implements OnInit {
  @Input({ required: true }) titulo!: string;
  @Input({ required: true }) descricao!: string;
  @Input({ required: true }) iconeTitulo!: string;
  @Input({ required: true }) recursos!: SistemaOperacional[];

  // Estado reativo de progresso nos tópicos da trilha
  concluidos = signal<Record<string, boolean>>({});

  ngOnInit() {
    this.carregarProgresso();
  }

  private getStorageKey(): string {
    const slug = (this.titulo || 'trilha').toLowerCase().replace(/\s+/g, '_');
    return `comunidade_tech_so_progresso_${slug}`;
  }

  private carregarProgresso() {
    try {
      const data = localStorage.getItem(this.getStorageKey());
      if (data) {
        this.concluidos.set(JSON.parse(data));
      }
    } catch (e) {
      console.warn('Erro ao carregar progresso do localStorage:', e);
    }
  }

  toggleConcluido(nome: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const atual = { ...this.concluidos() };
    atual[nome] = !atual[nome];
    this.concluidos.set(atual);

    try {
      localStorage.setItem(this.getStorageKey(), JSON.stringify(atual));
    } catch (e) {
      console.warn('Erro ao salvar progresso:', e);
    }
  }

  isConcluido(nome: string): boolean {
    return !!this.concluidos()[nome];
  }

  readonly totalRecursos = computed(() => this.recursos?.length || 0);

  readonly totalConcluidos = computed(() => {
    const mapa = this.concluidos();
    if (!this.recursos) return 0;
    return this.recursos.filter((r) => !!mapa[r.nome]).length;
  });

  readonly porcentagem = computed(() => {
    const total = this.totalRecursos();
    if (total === 0) return 0;
    return Math.round((this.totalConcluidos() / total) * 100);
  });
}
