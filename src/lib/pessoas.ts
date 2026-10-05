import camila from '../assets/socios/camila-moretti.jpg';
import joice from '../assets/socios/joice-ferreira.jpg';
import paulo from '../assets/socios/paulo-soares.jpg';
import type { ImageMetadata } from 'astro';

export type Socio = { nome: string; slug: string; foto: ImageMetadata; area: string; bio: string };

export const socios: Socio[] = [
  {
    nome: 'Camila Moretti', slug: 'camila-moretti', foto: camila,
    area: 'Mentoria, vendas e transformação de negócios',
    bio: 'Especialista em vendas, processos e desenvolvimento de agências de viagens, atua na transformação de profissionais do turismo em empresários mais estratégicos e preparados para crescer.',
  },
  {
    nome: 'Joice Ferreira', slug: 'joice-ferreira', foto: joice,
    area: 'Turismo, experiência e excelência',
    bio: 'Há mais de 30 anos no mercado de Orlando, fundadora da Magic Blue Turismo, une vivência prática, conhecimento de mercado e excelência para inspirar e formar profissionais capazes de encantar pessoas por meio do turismo.',
  },
  {
    nome: 'Paulo Soares', slug: 'paulo-soares', foto: paulo,
    area: 'Estratégia, inovação e visão de futuro',
    bio: 'Lidera projetos de posicionamento, produtos, eventos e Inteligência Artificial na Academia da Magia, com olhar para transformar possibilidades em negócios sustentáveis.',
  },
];

// Retratos de experts: src/assets/experts/<nome-sobrenome>.jpg (ou .png/.webp)
const expertFiles = import.meta.glob<{ default: ImageMetadata }>('../assets/experts/*.{jpg,jpeg,png,webp}', { eager: true });
const expertPorArquivo = (arquivo: string) =>
  Object.entries(expertFiles).find(([k]) => k.split('/').pop()!.replace(/\.\w+$/, '') === arquivo)?.[1].default ?? null;

export const slugNome = (nome: string) =>
  nome.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');

/**
 * Retrato de um expert. Ordem: arquivo indicado no programa (ex.: "joice-parque"),
 * arquivo com o nome da pessoa em src/assets/experts, retrato de sócio.
 */
export function fotoDe(nome: string, arquivo?: string): ImageMetadata | null {
  if (arquivo) {
    const f = expertPorArquivo(arquivo);
    if (f) return f;
  }
  const porNome = expertPorArquivo(slugNome(nome));
  if (porNome) return porNome;
  const primeiro = slugNome(nome).split('-')[0];
  return socios.find((s) => s.slug.startsWith(primeiro))?.foto ?? null;
}

export const iniciais = (nome: string) =>
  nome.split(/\s+/).filter(Boolean).slice(0, 2).map((n) => n[0]).join('').toUpperCase();
