/**
 * Imersões (página /imersoes). Fotos: coloque em src/assets/imersoes/<id>.jpg
 * (ex.: orlando.jpg, california.jpg, disney-cruise-line.jpg, dubai.jpg).
 */
export type Imersao = {
  id: string;
  nome: string;
  selo: string;
  texto: string;
  /** Página do programa, quando existe. */
  pagina?: string;
  breve?: boolean;
};

export const imersoes: Imersao[] = [
  {
    id: 'magic-makers-experience', nome: 'Magic Makers Experience', selo: 'A bordo da Disney Cruise Line',
    texto: 'Uma imersão de aprendizado a bordo do Disney Treasure, com Joice Ferreira, para vender cruzeiros Disney com autoridade.',
    pagina: '/magic-makers-experience',
  },
  {
    id: 'orlando', nome: 'Orlando', selo: 'Curso prático',
    texto: 'Nos parques de Orlando, a turma lidera um grupo de verdade, erra, aprende e pratica ao lado da Joice.',
  },
  {
    id: 'california', nome: 'Califórnia', selo: 'Curso prático',
    texto: 'Da Disneyland a Hollywood, a Califórnia vivida na prática com a turma da Academia.',
  },
  {
    id: 'disney-cruise-line', nome: 'Disney Cruise Line', selo: 'Curso prático',
    texto: 'O navio por dentro, das áreas de lazer às acomodações, para recomendar o cruzeiro certo para cada passageiro.',
  },
  {
    id: 'dubai', nome: 'Dubai', selo: 'Curso prático',
    texto: 'Luxo, deserto e experiências inesquecíveis, conhecidos de perto para vender com segurança.',
  },
  {
    id: 'connections', nome: 'Connections', selo: 'Em breve',
    texto: 'Uma nova imersão da Academia da Magia. Entre na lista e seja avisado do lançamento.',
    breve: true,
  },
];

/** Reality de Guiamento Virtual: evento virtual com guiamentos nestes destinos. */
export const realityDestinos = ['Orlando e Epic Universe', 'Califórnia', 'Paris'];
