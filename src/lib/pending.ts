/**
 * Conteúdo pendente: trechos entre colchetes como "[A PREENCHER]" ou
 * "[CONFIRMAR ...]" são marcadores de revisão (README do handoff, seção 11).
 *
 * - Produção: qualquer campo com marcador é ocultado. Para publicar, a equipe
 *   confirma o texto e remove o marcador do JSON.
 * - Revisão (PUBLIC_SHOW_PENDING=true): mostra o texto sem o marcador e uma
 *   etiqueta amarela com a pendência.
 */
export const SHOW_PENDING = import.meta.env.PUBLIC_SHOW_PENDING === 'true';

const MARKER = /\[[^\]]+\]/g;

export type Pv = {
  /** Texto sem os marcadores. */
  text: string;
  /** Pendências (sem colchetes), unidas por " · ". */
  tag: string;
  /** O campo contém algum marcador. */
  pending: boolean;
  /** O campo deve ser renderizado no modo atual. */
  show: boolean;
};

export function pv(value?: string | null): Pv {
  const s = value ?? '';
  const tags = s.match(MARKER) ?? [];
  const text = s.replace(MARKER, '').replace(/\s+/g, ' ').replace(/\s([.,])/g, '$1').trim();
  const tag = tags.map((t) => t.slice(1, -1)).join(' · ');
  const pending = tags.length > 0;
  const show = pending ? SHOW_PENDING : text.length > 0;
  return { text, tag, pending, show };
}

/** Texto utilizável no modo atual, ou `null` se deve ficar oculto. */
export function usable(value?: string | null): string | null {
  const p = pv(value);
  return p.show && p.text ? p.text : null;
}
