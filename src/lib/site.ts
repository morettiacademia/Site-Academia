import { SHOW_PENDING } from './pending';

const env = import.meta.env;
const url = (v?: string) => (v && v.trim() ? v.trim() : null);

/**
 * WhatsApp do atendimento (Adriana). Preencha com DDI + DDD + número, só dígitos,
 * ex.: '5511999998888' — ou defina PUBLIC_WHATSAPP_NUMERO na hospedagem.
 */
const WHATSAPP_NUMERO = (env.PUBLIC_WHATSAPP_NUMERO || '').replace(/\D/g, '');
const WHATSAPP_MENSAGEM = 'Olá! Vim pelo site da Academia da Magia e gostaria de ajuda para escolher meu próximo passo.';
const whatsappDoNumero = WHATSAPP_NUMERO
  ? `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAGEM)}`
  : null;

/** Links globais. Enquanto estiverem vazios, os elementos que dependem deles ficam ocultos ou usam um destino interno. */
export const links = {
  whatsapp: whatsappDoNumero ?? url(env.PUBLIC_WHATSAPP_URL),
  academia365: url(env.PUBLIC_ACADEMIA365_URL),
  instagram: url(env.PUBLIC_INSTAGRAM_URL),
  youtube: url(env.PUBLIC_YOUTUBE_URL),
  podcast: url(env.PUBLIC_PODCAST_URL),
  protagonistas: url(env.PUBLIC_PROTAGONISTAS_URL),
};

export const whatsappHref = links.whatsapp ?? '/contato';
export const academia365Href = links.academia365 ?? '/contato';
export const isExternal = (href: string) => /^https?:\/\//.test(href);

export const SITE_NAME = 'Academia da Magia';
/** Para onde os formulários enviam (GoDaddy: script PHP em public/enviar.php). */
export const FORM_ACTION = url(env.PUBLIC_FORM_ACTION) ?? '/enviar.php';
export const GTM_ID = url(env.PUBLIC_GTM_ID);

export type NavItem = { label: string; href: string; tag?: string };
export type NavCol = { title: string; sub: string; wide?: boolean; items: NavItem[] };
export type Menu = { introTitle: string; introText: string; introCta: string; introHref: string; cols: NavCol[] };
export type NavEntry = { key: string; label: string; href: string; menu?: Menu };

const P = (slug: string) => '/' + slug;

/** Item de menu que depende de um link externo ainda pendente. */
const ext = (label: string, href: string | null, tag?: string): NavItem[] =>
  href ? [{ label, href, tag }] : SHOW_PENDING ? [{ label, href: '#', tag: tag ? tag + ' · link pendente' : 'Link pendente' }] : [];

export const nav: NavEntry[] = [
  { key: 'home', label: 'Home', href: '/' },
  {
    key: 'formacoes', label: 'Formações', href: '/comece-aqui',
    menu: {
      introTitle: 'Todas as formações', introText: 'Encontre o caminho ideal para o seu momento.',
      introCta: 'Descubra seu próximo passo', introHref: '/comece-aqui',
      cols: [
        { title: 'Especializações', sub: 'Desenvolva uma competência que fortaleça sua entrega', items: [
          { label: 'Guiamento Virtual', href: P('guiamento-virtual') },
          { label: 'Guias de Orlando', href: P('guias-de-orlando') },
          { label: 'Creations', href: P('creations') },
          { label: 'Money’s', href: P('moneys') },
          { label: 'Hands On', href: P('hands-on') },
        ] },
        { title: 'Destinos', sub: 'Conhecimento de produto para vender com segurança', items: [
          { label: 'Orlando Lucrativo', href: P('orlando-lucrativo') },
          { label: 'Parqueamento', href: P('parqueamento') },
          { label: 'Disney Cruise Line', href: P('disney-cruise-line') },
          { label: 'Paris Além da Disney', href: P('paris-alem-da-disney') },
          { label: 'Rota Califórnia', href: P('rota-california') },
          { label: 'Japão', href: P('japao'), tag: 'Novo' },
          { label: 'Dubai', href: P('dubai'), tag: 'Em breve' },
        ] },
        { title: 'Ferramentas', sub: 'Pronto para usar hoje', items: [
          { label: 'E-books', href: '/ferramentas#ebooks' },
          { label: 'Biblioteca de Playbooks', href: '/ferramentas#playbooks' },
          { label: 'Playbook de Guiamento Virtual', href: '/ferramentas#playbook-guiamento' },
          { label: 'Planilha de Hotéis', href: '/ferramentas#planilha-hoteis' },
          { label: 'Oratória', href: '/ferramentas#oratoria' },
        ] },
      ],
    },
  },
  {
    key: 'mentorias', label: 'Mentorias', href: '/comece-aqui',
    menu: {
      introTitle: 'Mentorias', introText: 'Acompanhamento de perto para começar, estruturar e fazer crescer a sua agência.',
      introCta: 'Descubra seu próximo passo', introHref: '/comece-aqui',
      cols: [
        { title: 'Nossas mentorias', sub: 'Turmas com vagas limitadas', wide: true, items: [
          { label: 'Magic Makers', href: P('magic-makers'), tag: 'Turma 2027' },
          { label: 'AGIR', href: P('agir'), tag: 'Turmas de até 15 pessoas' },
          { label: 'Mentoria de IA', href: P('mentoria-ia'), tag: 'Turmas de até 15 pessoas' },
          { label: 'Excelência', href: P('excelencia'), tag: 'Em breve · 2027' },
        ] },
      ],
    },
  },
  {
    key: 'comunidade', label: 'Comunidade', href: '/magic-club',
    menu: {
      introTitle: 'Comunidade', introText: 'Pessoas, encontros e experiências que movimentam o turismo.',
      introCta: 'Conhecer o Magic Club', introHref: P('magic-club'),
      cols: [
        { title: 'Faça parte', sub: 'Assinatura, eventos e imersões', wide: true, items: [
          { label: 'Magic Club', href: P('magic-club'), tag: 'Assinatura' },
          { label: 'Magic Makers ao Vivo', href: P('magic-makers-ao-vivo'), tag: '15 e 16 de maio de 2027' },
          { label: 'Magic Makers Experience', href: P('magic-makers-experience'), tag: 'Imersão presencial' },
          { label: 'Reality de Guiamento Virtual', href: P('reality-guiamento-virtual'), tag: 'Evento virtual' },
        ] },
      ],
    },
  },
  {
    key: 'conteudos', label: 'Conteúdos', href: '/blog',
    menu: {
      introTitle: 'Conteúdos', introText: 'Artigos, conversas e bastidores para o seu dia a dia.',
      introCta: 'Ir para o blog', introHref: '/blog',
      cols: [
        { title: 'Acompanhe', sub: 'Leia, ouça e siga a Academia', wide: true, items: [
          { label: 'Blog', href: '/blog' },
          ...ext('Podcast Magic Makers', links.podcast, 'Retomada em 2027'),
          ...ext('Instagram', links.instagram),
          ...ext('YouTube', links.youtube),
        ] },
      ],
    },
  },
  { key: 'blog', label: 'Blog', href: '/blog' },
  {
    key: 'sobre', label: 'Sobre nós', href: '/sobre',
    menu: {
      introTitle: 'Sobre nós', introText: 'Quem criou a Academia e como ensinamos.',
      introCta: 'Conheça a Academia', introHref: '/sobre',
      cols: [
        { title: 'A Academia', sub: 'História, pessoas e contato', wide: true, items: [
          { label: 'Nossa história', href: '/sobre' },
          { label: 'Sócios e experts', href: '/sobre/socios-e-experts' },
          { label: 'Contato', href: '/contato' },
        ] },
      ],
    },
  },
];

export const footerCols: { title: string; links: NavItem[] }[] = [
  { title: 'Mentorias', links: [
    { label: 'Magic Makers', href: P('magic-makers') },
    { label: 'AGIR', href: P('agir') },
    { label: 'Mentoria de IA', href: P('mentoria-ia') },
    { label: 'Excelência', href: P('excelencia') },
  ] },
  { title: 'Formações', links: [
    { label: 'Especializações', href: P('guiamento-virtual') },
    { label: 'Destinos', href: P('orlando-lucrativo') },
    { label: 'Ferramentas', href: P('ferramentas') },
    { label: 'Comece aqui', href: '/comece-aqui' },
  ] },
  { title: 'Comunidade', links: [
    { label: 'Magic Club', href: P('magic-club') },
    { label: 'Magic Makers ao Vivo', href: P('magic-makers-ao-vivo') },
    { label: 'Magic Makers Experience', href: P('magic-makers-experience') },
    { label: 'Reality de Guiamento', href: P('reality-guiamento-virtual') },
  ] },
  { title: 'Academia', links: [
    { label: 'Nossa história', href: '/sobre' },
    { label: 'Sócios e experts', href: '/sobre/socios-e-experts' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contato', href: '/contato' },
    { label: 'Área do aluno', href: academia365Href },
  ] },
];
