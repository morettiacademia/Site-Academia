/**
 * Destaque do momento (vendas abertas). Aparece na faixa do topo de todas as
 * páginas e numa seção própria no meio da Home.
 * Para desligar, `ativo: false`. Para trocar de evento, edite os campos.
 */
export const destaque = {
  ativo: true,
  slug: 'magic-makers-ao-vivo',
  nome: 'Magic Makers ao Vivo',
  edicao: '5ª edição',
  ano: '2027',
  chamada: 'Imagine o que você pode construir quando está entre as pessoas certas.',
  texto: 'Um dia inteiro de palestras transformadoras, networking, parcerias e muito entretenimento, com um pré-evento exclusivo na noite anterior.',
  quando: '15 e 16 de maio de 2027',
  quandoCurto: '15 e 16 MAI 2027',
  onde: 'Apogeo Nobre · Alphaville, SP',
  vagas: '300 vagas',
  inicio: '2027-05-15T09:00:00-03:00',
  /** Página de vendas (checkout dos ingressos). */
  url: 'https://magicmakersaovivo27.academiadamagia.com.br',
  cta: 'Garanta sua vaga',
  selo: 'Vendas abertas',
};

export const diasPara = (iso: string) => Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000));
