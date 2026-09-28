# Site Academia da Magia

Site institucional e comercial da **Academia da Magia**, feito em [Astro](https://astro.build) a partir do handoff de design em `docs/handoff/` (o `README.md` de lá é a especificação completa).

## Rodar

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # gera o site estático em dist/
npm run preview    # serve o build
npm run check      # verificação de tipos
```

Copie `.env.example` para `.env` e preencha o que já estiver definido.

## Páginas

| URL | Arquivo |
|---|---|
| `/` | `src/pages/index.astro` |
| `/comece-aqui` | `src/pages/comece-aqui.astro` |
| `/<slug>` (21 programas) | `src/pages/[slug].astro` (dados em `src/data/programas.json`) |
| `/blog`, `/blog/<slug>` | `src/pages/blog/` (artigos em `src/content/blog/*.md`) |
| `/sobre`, `/sobre/socios-e-experts` | `src/pages/sobre/` |
| `/contato`, `/obrigado` | formulários (Netlify Forms) |
| `/privacidade`, `/termos`, `/cookies` | texto-base, **revisar com o jurídico** |
| `/404`, `/robots.txt`, `/sitemap-index.xml` | gerados no build |

## Conteúdo

- **Programas:** `src/data/programas.json` (mesmo formato do handoff). SEO title e meta description vêm de `src/data/seo.json` (extraídos do PDF de copy).
- **Links de checkout / página de vendas:** campo `"checkout": "https://..."` no programa. Com ele, o botão do topo e os botões de inscrição levam direto para essa página. Hoje estão definidos para AGIR, Mentoria de IA e Magic Makers ao Vivo. Sem ele, os botões levam ao WhatsApp (ou a `/contato`).
- **Grade de aulas em módulos:** campo `"modulos": [["Título do módulo", "Resumo", ["Aula 1", "Aula 2"]], ...]`. Quando existe, substitui o campo `grade`.
- **Destaque do momento:** `src/data/destaque.ts` (hoje, Magic Makers ao Vivo 2027). Ele alimenta a faixa no topo de todas as páginas, o primeiro slide do carrossel da Home e a seção logo abaixo do hero. Use `ativo: false` para desligar.
- **Blog:** crie um `.md` em `src/content/blog/` com `title`, `description`, `category`, `pubDate` e, se quiser, `cover` (imagem em `src/assets/`). Os três artigos atuais são rascunhos (`draft: true`) com os títulos ilustrativos do protótipo e não são publicados. O bloco "Do blog" da Home só aparece quando houver artigos publicados.
- **Fotos pendentes:** os espaços sem foto mostram um bloco da marca com a estrela. Para trocar, coloque a imagem em `src/assets/` e passe `src` no `ImgSlot` correspondente (slides do hero em `index.astro`, portais, Protagonistas, time em `comece-aqui.astro`).

### Conteúdo pendente (`[A PREENCHER]` / `[CONFIRMAR]`)

- **Em produção**, qualquer campo com marcador é ocultado. Seções que ficam sem conteúdo somem, e o botão do hero passa a apontar para a chamada final. Uma nota de seção pendente (ex.: `planosNota` do Magic Club, `ingressosNota` do MM ao Vivo) oculta a seção de planos/ingressos inteira.
- **Para publicar** um item, confirme o texto e remova o marcador do JSON.
- **Modo revisão:** `PUBLIC_SHOW_PENDING=true npm run build` mostra as etiquetas amarelas, os rascunhos do blog e as seções pendentes, e marca o site como `noindex`. Use-o só num deploy de preview.

## Links globais (variáveis de ambiente)

`PUBLIC_WHATSAPP_URL`, `PUBLIC_ACADEMIA365_URL`, `PUBLIC_INSTAGRAM_URL`, `PUBLIC_YOUTUBE_URL`, `PUBLIC_PODCAST_URL` e `PUBLIC_PROTAGONISTAS_URL`. Enquanto estiverem vazios:
- WhatsApp e Área do aluno apontam para `/contato`;
- Instagram, YouTube e Podcast não aparecem no menu;
- o botão "Conhecer o Protagonistas" fica oculto.

`SITE_URL` define o domínio usado em canonical, Open Graph e sitemap (padrão: `https://academiadamagia.com.br`).

## Medição e consentimento

- Banner de cookies (LGPD): o Google Tag Manager (`PUBLIC_GTM_ID`) só carrega após o aceite. O usuário pode rever a escolha em "Preferências de cookies", no rodapé.
- Eventos enviados ao `dataLayer` por atributos `data-track`: `cta_comece_aqui`, `momento_card_click`, `programa_view`, `cta_inscricao_click`, `lista_espera_submit`, `whatsapp_click`, `area_aluno_click` e `protagonistas_outbound`, com UTMs da sessão.

## Deploy

Funciona em Netlify (`netlify.toml`; os formulários usam Netlify Forms) ou Vercel (`vercel.json` com `cleanUrls`). O build usa `build.format: 'file'` e `trailingSlash: 'never'`, gerando URLs sem barra final, como `/agir`.

## Próximos passos (handoff, seção 15)

- Quiz completo de 5 a 7 perguntas em `/comece-aqui` (briefing, seção 4).
- Migrar `programas.json` para um CMS headless (Sanity, Payload, Decap ou Storyblok), com as entidades Turma, Expert e Depoimento.
- Redirects 301 das URLs antigas (em `netlify.toml` ou `vercel.json`).
- Pedir o logo oficial em SVG.
