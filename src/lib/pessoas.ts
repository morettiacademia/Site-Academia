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

/** Retrato de um expert, quando existe foto (hoje apenas os sócios). */
export function fotoDe(nome: string): ImageMetadata | null {
  const primeiro = nome.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().split(' ')[0];
  return socios.find((s) => s.slug.startsWith(primeiro))?.foto ?? null;
}

export const iniciais = (nome: string) =>
  nome.split(/\s+/).filter(Boolean).slice(0, 2).map((n) => n[0]).join('').toUpperCase();
