export interface MensagemMural {
  id?: string;
  mensagem: string;
  categoria: '#FUNDAMENTOS' | '#MINDSET' | '#PORTFÓLIO' | '#GIT' | '#CARREIRA' | '#DICA' | '#CONQUISTA';
  autorNome: string;
  autorFoto?: string;
  autorUid: string;
  dataCriacao: string;
  curtidas?: number;
}
