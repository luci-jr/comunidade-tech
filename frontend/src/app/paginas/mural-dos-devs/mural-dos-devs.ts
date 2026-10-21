import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FirestoreService } from '../../servicos/firestore.service';
import { AuthService } from '../../servicos/auth.service';
import { MensagemMural } from '../../models/mural.model';

@Component({
  selector: 'app-mural-dos-devs',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './mural-dos-devs.html',
  styleUrl: './mural-dos-devs.css',
})
export class MuralDosDevs {
  private firestoreService = inject(FirestoreService);
  private authService = inject(AuthService);

  // Autenticação reativa com Signals
  readonly usuario = toSignal(this.authService.user$, { initialValue: null });

  // Mensagens do Firestore em tempo real
  private mensagensFirestore = toSignal(this.firestoreService.listarMensagensMural(), {
    initialValue: [],
  });

  // Mensagens padrão de semente (fallback quando o banco ainda estiver vazio)
  readonly mensagensPadrao: MensagemMural[] = [
    {
      id: 'seed-1',
      categoria: '#FUNDAMENTOS',
      mensagem: 'Domine a linha de comando do Linux antes de pular para ferramentas avançadas. No dia a dia de servidores, Docker e nuvem, o terminal é a sua maior arma.',
      autorNome: 'Linux & Infra',
      autorUid: 'seed',
      dataCriacao: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      curtidas: 12,
    },
    {
      id: 'seed-2',
      categoria: '#MINDSET',
      mensagem: 'Fazer funcionar primeiro, deixar limpo depois e otimizar apenas se necessário. Não se cobre perfeição na primeira linha: código bom é código iterado.',
      autorNome: 'Clean Code',
      autorUid: 'seed',
      dataCriacao: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      curtidas: 19,
    },
    {
      id: 'seed-3',
      categoria: '#PORTFÓLIO',
      mensagem: 'Um projeto pessoal simples com deploy público funcionando na nuvem vale mais do que dez certificados de cursos que você assistiu sem digitar uma linha.',
      autorNome: 'Deploy Real',
      autorUid: 'seed',
      dataCriacao: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      curtidas: 27,
    },
    {
      id: 'seed-4',
      categoria: '#GIT',
      mensagem: 'Escreva commits com mensagens claras e aprenda a resolver conflitos de merge. Em ambiente profissional, trabalho em equipe começa no repositório.',
      autorNome: 'Versionamento',
      autorUid: 'seed',
      dataCriacao: new Date().toISOString(),
      curtidas: 8,
    },
    {
      id: 'seed-5',
      categoria: '#CARREIRA',
      mensagem: 'Participe de meetups técnicos e grupos locais. O networking genuíno com outros programadores acelera o seu aprendizado e abre portas reais.',
      autorNome: 'Networking',
      autorUid: 'seed',
      dataCriacao: new Date().toISOString(),
      curtidas: 14,
    },
  ];

  // Filtro de categorias
  readonly categoriasDisponiveis = [
    'TODAS',
    '#FUNDAMENTOS',
    '#MINDSET',
    '#PORTFÓLIO',
    '#GIT',
    '#CARREIRA',
    '#DICA',
    '#CONQUISTA',
  ] as const;

  filtroSelecionado = signal<string>('TODAS');

  // Mensagens mescladas (Firestore + Sementes) com filtro
  readonly mensagensExibidas = computed(() => {
    const doBanco = this.mensagensFirestore() || [];
    const listaCompleta = doBanco.length > 0 ? doBanco : this.mensagensPadrao;
    const filtro = this.filtroSelecionado();

    if (filtro === 'TODAS') {
      return listaCompleta;
    }
    return listaCompleta.filter((m) => m.categoria === filtro);
  });

  // Formulário de nova publicação
  novaMensagemTexto = signal('');
  categoriaSelecionada = signal<'#FUNDAMENTOS' | '#MINDSET' | '#PORTFÓLIO' | '#GIT' | '#CARREIRA' | '#DICA' | '#CONQUISTA'>('#MINDSET');
  enviando = signal(false);
  feedbackMsg = signal<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null);

  async fazerLogin() {
    try {
      await this.authService.loginComGoogle();
    } catch (e) {
      console.error('Erro de autenticação:', e);
    }
  }

  async publicarRecado() {
    const texto = this.novaMensagemTexto().trim();
    const user = this.usuario();

    if (!user) {
      this.feedbackMsg.set({
        tipo: 'erro',
        texto: 'Você precisa estar logado para publicar no mural.',
      });
      return;
    }

    if (!texto || texto.length < 5) {
      this.feedbackMsg.set({
        tipo: 'erro',
        texto: 'Por favor, escreva uma mensagem com pelo menos 5 caracteres.',
      });
      return;
    }

    if (texto.length > 350) {
      this.feedbackMsg.set({
        tipo: 'erro',
        texto: 'A mensagem não pode ultrapassar 350 caracteres.',
      });
      return;
    }

    this.enviando.set(true);
    this.feedbackMsg.set(null);

    try {
      await this.firestoreService.enviarMensagemMural({
        mensagem: texto,
        categoria: this.categoriaSelecionada(),
        autorNome: user.displayName || 'Dev da Comunidade',
        autorFoto: user.photoURL || undefined,
        autorUid: user.uid,
        dataCriacao: new Date().toISOString(),
      });

      this.novaMensagemTexto.set('');
      this.feedbackMsg.set({
        tipo: 'sucesso',
        texto: 'Recado publicado com sucesso no mural!',
      });
      setTimeout(() => this.feedbackMsg.set(null), 4000);
    } catch (err) {
      console.error('Erro ao postar no mural:', err);
      this.feedbackMsg.set({
        tipo: 'erro',
        texto: 'Não foi possível publicar seu recado. Tente novamente mais tarde.',
      });
    } finally {
      this.enviando.set(false);
    }
  }

  async curtir(mensagem: MensagemMural) {
    if (!mensagem.id || mensagem.autorUid === 'seed') {
      mensagem.curtidas = (mensagem.curtidas || 0) + 1;
      return;
    }

    try {
      await this.firestoreService.curtirMensagemMural(mensagem.id);
    } catch (e) {
      console.error('Erro ao curtir mensagem:', e);
    }
  }
}
