import data from '../data/programas.json';
import seo from '../data/seo.json';
import type { ImageMetadata } from 'astro';

export type Programa = {
  nome: string;
  menu: 'Mentorias' | 'Especializações' | 'Destinos' | 'Ferramentas' | 'Comunidade';
  seo?: string; logo?: string; logoDark?: boolean; breve?: boolean; novo?: boolean; hub?: boolean;
  selo: string; titulo: string; subtitulo: string; botao: string; imagem?: string;
  contador?: string;
  intro?: { titulo: string; texto: string };
  paraQuem?: string[];
  aprenderTitulo?: string; aprender?: string[]; aprenderNota?: string;
  etapas?: [string, string, string][]; etapasNota?: string;
  grupos?: [string, string][]; destinos?: string[];
  funciona?: [string, string][];
  historia?: [string, string, string][];
  gradeTitulo?: string; grade?: string;
  /** Grade de aulas em módulos: [título do módulo, resumo, aulas (opcional)]. Tem prioridade sobre `grade`. */
  modulos?: [string, string, string[]?][];
  experts?: [string, string][];
  prova?: string; depoimentos?: string;
  investimento?: string; extra?: string; extraLink?: string;
  planos?: [string, string, string][]; planosNota?: string;
  ingressos?: [string, string, string, string][]; ingressosNota?: string;
  parceiros?: string;
  ferramentas?: [string, string, string, string, string, string][];
  faq?: [string, string][];
  final: [string, string]; finalTexto?: string; finalComece?: boolean;
  /** Link de checkout/inscrição (pendente em todos os programas). */
  checkout?: string;
};

export const programas = data as unknown as Record<string, Programa>;
export const slugs = Object.keys(programas);

type Seo = { title: string | null; description: string | null };
const seoMap = seo as Record<string, Seo>;

export function seoFor(slug: string) {
  const p = programas[slug];
  const s = seoMap[slug];
  return {
    title: s?.title || p.seo || `${p.nome} | Academia da Magia`,
    description: s?.description || p.subtitulo,
  };
}

/** Grupo exibido no breadcrumb (Especializações e Destinos ficam sob Formações). */
export const menuGroup = (p: Programa) =>
  p.menu === 'Especializações' || p.menu === 'Destinos' || p.menu === 'Ferramentas' ? 'Formações' : p.menu;

// Logos dos programas (otimizados no build)
const logoFiles = import.meta.glob<{ default: ImageMetadata }>('../assets/*.png', { eager: true });
export function logoFor(p: Programa): ImageMetadata | null {
  if (!p.logo) return null;
  const file = p.logo.replace(/^assets\//, '');
  return logoFiles[`../assets/${file}`]?.default ?? null;
}
