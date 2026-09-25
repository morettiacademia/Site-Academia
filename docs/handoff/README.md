# Handoff: Site Academia da Magia

> Pacote para implementação no Claude Code. Este README é autossuficiente: quem não acompanhou a conversa de design consegue construir o site só com ele + a pasta `prototipo/` + a pasta `conteudo/`.

---

## 1. Visão geral

Site institucional e comercial da **Academia da Magia**, marca brasileira de formação para profissionais do turismo (foco em Orlando e destinos internacionais). Público: aspirantes a agente de viagens, agentes em início de carreira, especialistas e donos de agência.

Objetivos do site:
1. Explicar rapidamente o que é a Academia.
2. Levar cada visitante ao programa certo para o seu momento (página **Comece aqui**).
3. Ter **uma página própria, indexável, por programa** (21 páginas de programa).
4. Gerar conversões mensuráveis (lista de espera, inscrição, WhatsApp, checkout).
5. Sustentar SEO orgânico (HTML rastreável, blog, metadados por página).

Idioma: **pt-BR**. Moeda: **R$**.

---

## 2. Sobre os arquivos de design

Os arquivos em `prototipo/` são **referências de design feitas em HTML**: protótipos que mostram o visual e o comportamento pretendidos. **Não são código de produção para copiar.**

A tarefa é **recriar esses designs numa stack de produção**. Não existe codebase ainda, então a recomendação é:

- **Framework:** **Astro** (preferido, SSG, zero-JS por padrão, excelente para SEO) ou **Next.js (App Router, `output: 'export'` ou SSG)**. O conteúdo essencial precisa sair em HTML estático (requisito de SEO do briefing).
- **Estilo:** Tailwind CSS ou CSS Modules, com os tokens da seção 6 como variáveis CSS.
- **Conteúdo:** começar com `conteudo/programas.json` como fonte (collection/content layer). Evoluir para um CMS headless (Sanity, Payload, Decap ou Storyblok) com as entidades da seção 9.
- **Interatividade:** ilhas pequenas (Astro islands / client components) apenas para: mega menu, menu mobile, carrossel do hero, acordeão de FAQ, cards do Comece aqui, contador de dias.
- **Deploy:** Vercel ou Netlify.

### Como abrir o protótipo
Os arquivos `.dc.html` precisam ser servidos por HTTP (não abrem via `file://` porque fazem `fetch`). Na pasta `prototipo/`:
```
npx serve .
```
Abra `Home v2.dc.html`. As páginas de programa usam `Programa.dc.html?p=<slug>` (ex.: `?p=agir`). O `support.js` é só o runtime do protótipo, **não faz parte do site final**.

Cada `.dc.html` tem o markup com estilos inline (valores exatos) e, no final, uma classe `Component` com a lógica (estado, dados, handlers). Use-os como fonte de medidas e comportamento.

---

## 3. Fidelidade

**Alta fidelidade (hi-fi).** Cores, tipografia, espaçamentos, raios, estados de hover e responsividade são finais. Recriar pixel-perfect.

Exceções:
- Blocos marcados com **etiqueta amarela** (`#ffe27a`) são **conteúdo pendente** (`[A PREENCHER]` / `[CONFIRMAR]`). No site publicado **não devem aparecer**. Ver seção 11.
- Os espaços de imagem vazios (placeholders tracejados) são para fotos reais que ainda serão enviadas.
- A prévia do quiz na Home (seção "Qual formação faz sentido agora?") é ilustrativa: leva para `/comece-aqui`.

---

## 4. Mapa do site e URLs

| Página | URL final | Arquivo de referência |
|---|---|---|
| Home | `/` | `Home v2.dc.html` |
| Comece aqui | `/comece-aqui` | `Comece aqui.dc.html` |
| Programa (template) | `/<slug>` | `Programa.dc.html?p=<slug>` |
| Blog (hub) | `/blog` | a criar (seguir o bloco "Do blog" da Home) |
| Artigo | `/blog/<slug>` | a criar |
| Sobre / Nossa história | `/sobre` | a criar (reusar bloco Sócios + Juntos da Home) |
| Sócios e experts | `/sobre/socios-e-experts` | a criar |
| Contato | `/contato` | a criar |
| Privacidade / Termos / Cookies | `/privacidade` etc. | a criar |
| Área do aluno | **externo**: Academia 365 | URL real pendente |

URLs das páginas de programa (conforme o PDF de copy):

| Menu | Grupo | Programa | Slug / URL |
|---|---|---|---|
| Mentorias | — | Magic Makers | `/magic-makers` |
| Mentorias | — | AGIR | `/agir` |
| Mentorias | — | Mentoria de IA | `/mentoria-ia` |
| Mentorias | — | Excelência (em breve) | `/excelencia` |
| Formações | Especializações | Guiamento Virtual | `/guiamento-virtual` |
| Formações | Especializações | Guias de Orlando | `/guias-de-orlando` |
| Formações | Especializações | Creations | `/creations` |
| Formações | Especializações | Money’s | `/moneys` |
| Formações | Especializações | Hands On | `/hands-on` |
| Formações | Destinos | Orlando Lucrativo | `/orlando-lucrativo` |
| Formações | Destinos | Parqueamento | `/parqueamento` |
| Formações | Destinos | Disney Cruise Line | `/disney-cruise-line` |
| Formações | Destinos | Paris Além da Disney | `/paris-alem-da-disney` |
| Formações | Destinos | Rota Califórnia | `/rota-california` |
| Formações | Destinos | Japão (novo) | `/japao` |
| Formações | Destinos | Dubai (em breve) | `/dubai` |
| Formações | Ferramentas | Hub de Ferramentas | `/ferramentas` (âncoras `#ebooks`, `#playbooks`, `#playbook-guiamento`, `#planilha-hoteis`, `#oratoria`) |
| Comunidade | — | Magic Club | `/magic-club` |
| Comunidade | — | Magic Makers ao Vivo | `/magic-makers-ao-vivo` |
| Comunidade | — | Magic Makers Experience | `/magic-makers-experience` |
| Comunidade | — | Reality de Guiamento Virtual | `/reality-guiamento-virtual` |

Os slugs são as chaves de `conteudo/programas.json`. Gerar `sitemap.xml`, `robots.txt` e `<link rel="canonical">` por página.

---

## 5. Layout global

- **Container:** `max-width: 1320px; margin: 0 auto; padding-inline: 24px`.
- **Espaço vertical das seções:** `padding-block: clamp(56px, 8vw, 112px)` (a maioria). Hero e chamada final: até `clamp(64px, 9vw, 140px)`.
- **Grids:** sempre fluidos com `repeat(auto-fit, minmax(min(100%, Xpx), 1fr))`, com X entre 240 e 480px conforme o bloco (valores exatos no protótipo). Nada de larguras fixas em blocos com texto.
- **Ritmo de fundo:** as seções alternam entre **navy `#0c1b3d`**, **azul Academia `#1b5aa8`**, **ciano `#36b6e9`** (texto navy) e **claro `#f4f8fc` / branco** (texto navy). Nunca duas seções seguidas com o mesmo fundo quando evitável.
- **Cabeçalho** fixo no topo (`position: sticky; top: 0; z-index: 30`).

### Breakpoints
| Largura | Comportamento |
|---|---|
| `< 1180px` | Cabeçalho vira modo mobile (logo + botão "Menu"); menu abre em painel com grupos |
| `≥ 1180px` | Nav completa + botão "Comece aqui" + "Área do aluno" |
| `< 1200px` | Hero da Home empilha (foto em cima, texto embaixo sobre navy) |
| `≥ 1200px` | Hero da Home com texto sobreposto à esquerda (coluna 40%) |

Projetar mobile primeiro. Alvos de toque ≥ 44px.

---

## 6. Design tokens

### Cores
| Token | Hex | Uso |
|---|---|---|
| `--navy-900` | `#081330` | Fundo do rodapé |
| `--navy-800` | `#0c1b3d` | Fundo base, cabeçalho, seções escuras, texto sobre fundos claros |
| `--navy-700` | `#13295a` | Cards sobre navy |
| `--navy-600` | `#1b3163` | Fundo de placeholder de imagem sobre navy |
| `--navy-line` | `#1f3566` | Bordas/divisores sobre navy (cabeçalho, rodapé) |
| `--navy-line-2` | `#1f3a73` | Borda de cards sobre navy |
| `--navy-line-3` | `#2c4478` | Borda de chips/botões outline sobre navy |
| `--blue-600` | `#1b5aa8` | **Azul Academia** — seções, botões primários sobre claro |
| `--blue-500` | `#2a6bb8` | Placeholder de imagem sobre azul |
| `--blue-line` | `#4a82c6` | Divisores sobre `--blue-600` |
| `--blue-btn-border` | `#2f72c4` | Borda de botão azul sobre navy |
| `--cyan-500` | `#36b6e9` | Ciano — destaques, botão "Comece aqui", seções manifesto/intro |
| `--cyan-300` | `#7fd6fb` | Palavras de destaque em títulos, selos sobre azul |
| `--cyan-200` | `#bfe6fa` | Eyebrows/labels sobre azul |
| `--ink-on-blue` | `#e1effb` | Parágrafos sobre azul |
| `--ink-on-navy` | `#dbe8f6` | Parágrafos fortes sobre navy |
| `--muted-on-navy` | `#b8c8e2` | Parágrafos secundários sobre navy |
| `--surface-light` | `#f4f8fc` | Seções claras |
| `--surface-alt` | `#eef3f9` | Colunas alternadas do mega menu |
| `--line-light` | `#cfdcea` | Divisores sobre claro |
| `--line-light-2` | `#dbe3ee` | Bordas de card sobre claro |
| `--line-dashed` | `#9fb6d3` | Bordas tracejadas (blocos pendentes) |
| `--ink-body` | `#3d4863` | Texto corrido sobre claro |
| `--ink-muted` | `#4a5670` | Texto secundário sobre claro |
| `--pending` | `#ffe27a` | **Somente em revisão**: etiquetas de conteúdo pendente |
| `--white` | `#ffffff` | |

Contraste: texto sempre ≥ 4.5:1 (WCAG 2.2 AA). Texto navy sobre ciano, branco sobre azul/navy.

### Tipografia
Google Fonts:
```
https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Montserrat:wght@400;500;600;700&display=swap
```
- **Títulos / display:** `Bricolage Grotesque`, peso **800** (700 em títulos de card e do menu).
- **Texto e interface:** `Montserrat`, pesos 400/500/600/700.
- Auto-hospedar as fontes em produção (performance/LCP).

| Estilo | Fonte | Tamanho | Peso | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| H1 Home | Bricolage | `clamp(44px, 5.4vw, 88px)` | 800 | 0.92 | -0.04em |
| H1 Comece aqui | Bricolage | `clamp(44px, 7vw, 112px)` | 800 | 0.92 | -0.04em |
| H1 Programa | Bricolage | `clamp(40px, 5.4vw, 80px)` | 800 | 0.98 | -0.035em |
| Manifesto / chamada final | Bricolage | `clamp(40px, 6–6.6vw, 96–104px)` | 800 | 0.94 | -0.035em |
| H2 seção | Bricolage | `clamp(36px, 4.4vw, 64px)` | 800 | 0.98 | -0.03em |
| H2 menor (blog, grade) | Bricolage | `clamp(34px, 4vw, 56px)` | 800 | 1 | -0.03em |
| Título de card grande | Bricolage | 28–40px | 800 | 1–1.05 | -0.02em |
| Título de card | Bricolage | 21–24px | 700 | 1.15 | -0.01em |
| Lead / subtítulo | Montserrat | `clamp(17px, 1.4vw, 21px)` | 400–500 | 1.5–1.55 | 0 |
| Corpo | Montserrat | 15.5–17px | 400–500 | 1.55–1.6 | 0 |
| Eyebrow / label | Montserrat | 12–13px | 700 | — | 0.1–0.14em, UPPERCASE |
| Nav | Montserrat | 14px | 500 | — | 0 |
| Botão | Montserrat | 14–17px | 700 | — | 0 |

Use `text-wrap: balance` em títulos e `text-wrap: pretty` em parágrafos.

### Raios
| Uso | Valor |
|---|---|
| Botões (padrão atual) | `12px` |
| Botões pílula (alguns secundários da Home) | `999px` |
| Chips / selos | `999px` |
| Etiqueta pendente | `6px` |
| Cards | `24px` / `28px` |
| Blocos grandes (preço, "Juntos", quiz) | `28px`–`32px` |
| Mega menu | `0 0 24px 24px` |
| Imagem do hero do programa | `260px 260px 28px 28px` (arco) |

### Sombras
- Mega menu: `0 30px 70px rgba(4,12,32,0.5)`
- Card do quiz: `0 30px 80px rgba(4,12,32,0.35)`

### Gradientes (apenas scrims sobre fotos)
- Portais da Home: `linear-gradient(180deg, rgba(12,27,61,0) 30%, rgba(12,27,61,0.88) 100%)`
- Hero Home desktop: `linear-gradient(90deg, rgba(12,27,61,.95) 0%, rgba(12,27,61,.75) 30%, rgba(12,27,61,0) 52%), linear-gradient(0deg, rgba(12,27,61,.6) 0%, rgba(12,27,61,0) 30%)`
- Hero Home empilhado: `linear-gradient(0deg, #0c1b3d 0%, rgba(12,27,61,0) 35%)`

### Motivo gráfico
A estrela **★** (vinda do selo da marca) é usada em marcadores de lista, itens do mega menu (círculo navy 36px com ★ branca), eyebrow "★★★" do hero e no botão "Comece aqui ★". Em produção, trocar por SVG de estrela de 5 pontas.

### Foco / acessibilidade
- `:focus-visible { outline: 3px solid #36b6e9; outline-offset: 3px }`
- Respeitar `prefers-reduced-motion`: sem transições e carrossel pausado por padrão.

---

## 7. Componentes globais

### 7.1 Cabeçalho (`Header.dc.html`) — mega menu
- Fundo `#0c1b3d`, borda inferior `1px #1f3566`, padding `10px 24px`, container 1320px, flex com gap 20px.
- **Logo:** `assets/academia-da-magia.png`, altura 54px, link para `/`.
- **Nav (desktop):** centralizada, itens com padding `14px 8px`, Montserrat 14/500 branco, `white-space: nowrap`, hover `#7fd6fb`. Itens com submenu mostram `▼` (9px) e trocam para `▲` quando abertos.
  Ordem: **Home · Formações▾ · Mentorias▾ · Comunidade▾ · Conteúdos▾ · Blog · Sobre nós▾**
- **Direita:**
  1. **Botão "Comece aqui"**: caixa ciano `#36b6e9`, texto navy, raio 12px, padding `8px 16px`, duas linhas: "Comece aqui ★" (14.5px/800) e "Descubra seu próximo passo" (11px/600). Hover: fundo branco. Link `/comece-aqui`.
  2. **"Área do aluno"**: outline branco 1.5px, raio 12px, padding `12px 18px`, 14px/700. Hover: fundo branco, texto navy. Link externo para a **Academia 365** (URL pendente).
- **Mega menu:** abre ao passar o mouse (e ao clicar, para teclado/toque). Fecha ao sair do cabeçalho.
  - Painel branco em largura total (max 1272px), colado sob a barra, raio inferior 24px, sombra da seção 6.
  - **Coluna 1 (intro):** fundo `#eef3f9`, padding `32px 32px 36px`; título Bricolage 21/700 `#1b5aa8`; texto 15px `#3d4863`; botão azul `#1b5aa8` (raio 12, padding `15px 22px`).
  - **Colunas de itens:** fundo alternado branco / `#eef3f9`, padding `32px 28px 36px`; título da coluna Bricolage 21/700 `#1b5aa8` + subtítulo 14.5px; itens com círculo navy 36px + ★, rótulo 15.5px/500, etiqueta opcional 12px/700 `#1b5aa8` abaixo ("Novo", "Em breve", "Turma 2027"...).
  - Grid: com 3 colunas de itens → `repeat(4, 1fr)`; com 1 coluna → `320px 1fr` e os itens em 2 colunas.
  - Conteúdo dos menus:
    - **Formações** — intro "Todas as formações" / CTA "Descubra seu próximo passo" → `/comece-aqui`. Colunas: **Especializações** (Guiamento Virtual, Guias de Orlando, Creations, Money’s, Hands On) · **Destinos** (Orlando Lucrativo, Parqueamento, Disney Cruise Line, Paris Além da Disney, Rota Califórnia, Japão *Novo*, Dubai *Em breve*) · **Ferramentas** (E-books, Biblioteca de Playbooks, Playbook de Guiamento Virtual, Planilha de Hotéis, Oratória).
    - **Mentorias** — Magic Makers *Turma 2027*, AGIR *Turmas de até 15 pessoas*, Mentoria de IA *Turmas de até 15 pessoas*, Excelência *Em breve · 2027*.
    - **Comunidade** — Magic Club *Assinatura*, Magic Makers ao Vivo *15 e 16 de maio de 2027*, Magic Makers Experience *Imersão presencial*, Reality de Guiamento Virtual *Evento virtual*.
    - **Conteúdos** — Blog, Podcast Magic Makers *Retomada em 2027*, Instagram, YouTube.
    - **Sobre nós** — Nossa história, Sócios e experts, Contato.
- **Mobile (< 1180px):** logo + botão pílula "Menu"/"Fechar" (outline ciano, altura 46px). Painel abaixo da barra, rolável (`max-height: 80vh`): cada grupo com título Bricolage 22/700 e subitens como chips outline (`#2c4478`, raio 999px). No fim, botão ciano "Comece aqui ★ Descubra seu próximo passo" e botão outline "Área do aluno · Academia 365".
- Acessibilidade: `aria-expanded` nos gatilhos; Esc fecha; navegação por teclado entre itens; os links do catálogo precisam existir também fora do menu (rodapé + páginas), para não depender do menu expansível.

### 7.2 Rodapé (`Footer.dc.html`)
- Fundo `#081330`, texto `#b8c8e2`, padding `72px 24px 32px`.
- Faixa superior: "Vamos encontrar seu próximo passo?" (Bricolage 800, `clamp(32px,4vw,56px)`, branco) + botões "Descubra seu próximo passo" (azul) e "Falar no WhatsApp" (outline). Borda inferior `1px #1f3566`.
- Grid de colunas: Logo (72px) · **Mentorias** · **Formações** · **Comunidade** · **Academia** (links 14.5px, hover branco; títulos 12px/700 uppercase branco).
- Linha final: "© Academia da Magia" + Privacidade · Termos · Cookies.

### 7.3 Botões
| Variante | Fundo | Texto | Borda | Hover |
|---|---|---|---|---|
| Primário sobre azul/navy | `#fff` | `#0c1b3d` | — | fundo `#0c1b3d`, texto branco |
| Ciano | `#36b6e9` | `#0c1b3d` | — | fundo `#fff` |
| Azul | `#1b5aa8` | `#fff` | — | fundo `#0c1b3d` (ou `#36b6e9` no cabeçalho) |
| Navy sobre claro | `#0c1b3d` | `#fff` | — | fundo `#1b5aa8` |
| Outline claro | transparente | `#fff` | 2px `#fff` | fundo `#fff`, texto navy |
| Outline ciano | transparente | `#fff` | 2px `#36b6e9` | fundo `#36b6e9`, texto navy |

Padding padrão: `16–18px 26–28px`, 16px/700, raio 12px. CTAs de ação terminam com " →"; links externos com " ↗".

### 7.4 Outros componentes
- **Selo/badge:** 13px/700, letter-spacing .06em, navy sobre `#7fd6fb`, padding `8px 14px`, raio 999px.
- **Chip de categoria:** 12px/700, branco sobre `#1b5aa8`, padding `5–6px 12px`, raio 999px.
- **Marcador estrela:** círculo 40px `#1b5aa8` com ★ branca 15px.
- **Card sobre navy:** fundo `#13295a`, borda `1px #1f3a73`, raio 24–28px, padding 28px.
- **Acordeão FAQ:** linhas com borda superior `1.5px #cfdcea`; pergunta 18px/700; botão circular 36px `#1b5aa8` com "+"/"−"; resposta 16px `#3d4863`. Primeiro item aberto por padrão; um aberto por vez.

---

## 8. Telas

### 8.1 Home (`/`) — `Home v2.dc.html`
Ordem das seções:

1. **Hero em carrossel** (fundo navy)
   - 5 slides em crossfade (`opacity` com transição de 1.2s ease), troca automática a cada **5.5s**. Pausa: botão circular 40px (❚❚ / ▶). Indicadores: pontos de 8px (ativo com 28px de largura e branco; inativos `rgba(255,255,255,.45)`), transição de largura .3s.
   - Slide 1: `assets/hero-socios.png` (Camila, Joice e Paulo, fundo azul estrelado; pessoas no lado direito). Slides 2–5: fotos pendentes — alunos em Orlando; Magic Makers ao Vivo (plateia); imersão a bordo / Magic Makers Experience; turma em aula ou mentoria.
   - **≥ 1200px:** altura `clamp(600px, 88vh, 920px)`, texto sobreposto no canto inferior esquerdo em coluna de **40%** da largura do container, scrim horizontal (seção 6).
   - **< 1200px:** foto em cima com altura `clamp(280px, 58vw, 620px)` e fade inferior; texto em bloco abaixo, sobre navy, padding `8px 24px 56px`.
   - Conteúdo: eyebrow "★★★ FORMAÇÃO · ESTRATÉGIA · EXPERIÊNCIAS" (`#bfe6fa`); H1 "Sua paixão por viagens vira **autoridade** e negócio." ("autoridade" em `#7fd6fb`); lead "Cursos, mentorias, comunidade e experiências para quem está começando no turismo — e para quem quer crescer com mais direção."; botões "Descubra seu próximo passo →" (ciano → `/comece-aqui`) e "Explore as formações" (outline → `#caminhos`).
   - Carrossel: não é essencial para entender a página (o conteúdo está no texto fixo). `aria-roledescription="carrossel"`, slides inativos com `aria-hidden`, pausado se `prefers-reduced-motion`. O slide 1 é o LCP: pré-carregar e servir em AVIF/WebP com `srcset`.

2. **Caminhos** (`#caminhos`, navy) — H2 "Existe um próximo passo para o **seu momento.**" + texto "A jornada não é igual para todo mundo. Escolha por onde seguir." Grid de 4 **portais** (cards com foto de fundo, altura `clamp(380px, 34vw, 480px)`, raio 28px, scrim inferior): 01 Especializações · 02 Destinos · 03 Comunidade · 04 Mentorias. Cada um com número (`#7fd6fb`), título Bricolage 800, texto curto e pílula branca "Ver … →". Hoje todos levam para `/comece-aqui` (não existem hubs de categoria no PDF). Fotos pendentes.

3. **Manifesto** (ciano `#36b6e9`, texto navy) — H2 gigante "Conhecimento que sai da aula e entra no seu trabalho." + parágrafo + botão navy "Conheça a Academia →".

4. **Sócios** (`#sobre`, navy) — H2 "Pessoas por trás da Academia." + "Três trajetórias diferentes, uma mesma visão." Grid de 3 cards (`#13295a`, raio 28px): foto 4:5 no topo, nome (Bricolage 30/800), área (12.5px/700 uppercase `#7fd6fb`), bio (15.5px `#dbe8f6`).
   - **Camila Moretti** — `assets/socios/camila-moretti.jpg` — *Mentoria, vendas e transformação de negócios* — "Especialista em vendas, processos e desenvolvimento de agências de viagens, atua na transformação de profissionais do turismo em empresários mais estratégicos e preparados para crescer."
   - **Joice Ferreira** — `assets/socios/joice-ferreira.jpg` — *Turismo, experiência e excelência* — "Há mais de 30 anos no mercado de Orlando, fundadora da Magic Blue Turismo, une vivência prática, conhecimento de mercado e excelência para inspirar e formar profissionais capazes de encantar pessoas por meio do turismo."
   - **Paulo Soares** — `assets/socios/paulo-soares.jpg` — *Estratégia, inovação e visão de futuro* — "Lidera projetos de posicionamento, produtos, eventos e Inteligência Artificial na Academia da Magia, com olhar para transformar possibilidades em negócios sustentáveis."
   - **Bloco "Juntos."** (fundo `#1b5aa8`, raio 28px, flex com quebra): "Juntos." em Bricolage 800 `clamp(40px,5vw,72px)` + texto "Camila traz a execução, Joice a essência do turismo, Paulo a estratégia. Juntos constroem a Academia da Magia com um propósito: ajudar profissionais do turismo a construírem negócios melhores sem perder o que torna essa profissão extraordinária — as pessoas, as experiências e as conexões humanas."

5. **Chamada do quiz** (`#quiz`, azul) — H2 "Qual formação faz sentido **agora?**" + "Perguntas rápidas. Uma recomendação explicada. Sem pedir contato antes do resultado." À direita, card branco ilustrando a pergunta 1 (barra de progresso, 4 opções selecionáveis: "Quero começar no turismo", "Sou agente em início de carreira", "Quero me especializar", "Tenho uma agência e quero crescer") e botão "Descobrir meu próximo passo →" → `/comece-aqui`.

6. **Protagonistas** (`#protagonistas`, navy) — foto 4:3 com raio 28px (pendente) + eyebrow "PROTAGONISTAS", H2 "Aprender abre caminhos para participar ainda mais.", texto e botão outline ciano "Conhecer o Protagonistas ↗" → **site externo oficial (URL pendente)**.

7. **Do blog** (`#blog`, `#f4f8fc`) — H2 "Do blog" + link "Ver todos os artigos →". 3 cards: imagem 4:3 raio 24px, chip de categoria, título Bricolage 22/700. **Em produção: puxar os 3 artigos mais recentes do blog.** (Os títulos do protótipo são ilustrativos.)

8. Rodapé.

### 8.2 Comece aqui (`/comece-aqui`) — `Comece aqui.dc.html`
SEO title: "Comece aqui | Academia da Magia". Meta description no PDF.
1. **Hero** (azul): selo "Seu próximo passo"; H1 "Toda jornada mágica começa com uma **escolha**"; texto "Responda com o coração: em que momento você está hoje? A gente te mostra o caminho."
2. **4 cards de momento** (ainda sobre azul, min-height 460px, raio 28px). Estado padrão: fundo navy, texto branco; card em hover/foco: fundo branco, texto navy, número `#1b5aa8`, botão azul (transição .2s). Cada card: número 01–04 (Bricolage 56/800), título, texto, "Programas indicados" com chips que linkam para cada programa, botão largo.
   | # | Título | Texto | Programas indicados | Botão |
   |---|---|---|---|---|
   | 1 | Estou começando | Sou apaixonado por viagens e quero transformar isso em profissão. | Magic Makers, Guias de Orlando, Guiamento Virtual | Quero começar |
   | 2 | Quero me especializar | Já atuo no turismo e quero dominar um destino ou uma habilidade. | Destinos, Creations, Hands On, Ferramentas | Quero me especializar |
   | 3 | Quero estruturar e crescer | Já tenho agência e preciso de processos, finanças e tecnologia. | AGIR, Mentoria de IA, Money’s | Quero crescer |
   | 4 | Quero viver a experiência | Quero aprender na prática e estar perto de quem vive o mercado. | Magic Club, Magic Makers ao Vivo, Magic Makers Experience, Reality | Quero viver |
   O botão de cada card leva ao primeiro programa indicado. *Evolução futura prevista no briefing: quiz de 5–7 perguntas com recomendação explicada (ver `conteudo/Briefing_site_Academia_da_Magia.md`, seção 4).*
3. **Ainda em dúvida?** (navy): H2 + "Fale com o nosso time. A gente escuta o seu momento e indica o melhor caminho, sem pressa e sem fórmula pronta." + botão ciano "Falar no WhatsApp →" + foto circular do time (pendente).

### 8.3 Template de programa (`/<slug>`) — `Programa.dc.html`
Um único template renderiza os 21 programas a partir de `programas.json`. **Seções só aparecem se o campo existir** (e, em produção, se houver conteúdo real).

| # | Seção | Fundo | Campo(s) no JSON | Detalhes |
|---|---|---|---|---|
| 1 | Hero | azul | `menu`, `nome`, `logo`, `logoDark`, `selo`, `titulo`, `subtitulo`, `botao`, `imagem`, `contador` | Breadcrumb "Início › {menu} › {nome}". Logo do programa (se houver) numa placa branca, ou navy se `logoDark: true`, raio 18px, altura 56px. Selo ciano claro. H1. Subtítulo. Contador "X dias para o…" se `contador` (data ISO). Botão branco → `#investimento` (ou `#final` se não houver oferta). À direita, imagem em arco (`260px 260px 28px 28px`), altura `clamp(380px,42vw,580px)`; `imagem` descreve a foto a usar. |
| 2 | Introdução | ciano | `intro.titulo`, `intro.texto` | Duas colunas: título Bricolage + texto 19–24px/500. |
| 3 | Para quem é | navy | `paraQuem[]` | Cards `#13295a` numerados 01, 02… (número Bricolage 40 ciano). |
| 4 | O que você vai aprender | `#f4f8fc` | `aprenderTitulo` (padrão "O que você vai aprender"), `aprender[]`, `aprenderNota` | Título sticky à esquerda (`top: 110px`), lista à direita com marcador estrela e divisores. |
| 5 | Etapas | branco | `etapas[]` = [nome, formato, texto], `etapasNota` | 2 cards grandes (1º ciano, 2º navy). Usado em Guias de Orlando. |
| 6 | Grupos + destinos | navy | `grupos[]` = [título, texto], `destinos[]` | Usado no Reality. |
| 7 | Como funciona | azul | `funciona[]` = [label, valor] | Grid de "fichas" separadas por linhas de 1px `#4a82c6`, raio 24px. Label 13px uppercase `#bfe6fa`, valor 18px/600. |
| 8 | Uma história que só cresce | navy | `historia[]` = [edição, ano, participantes] | Gráfico de barras em HTML: altura = 90px + (participantes/300)×180px; última barra ciano, demais `#7fd6fb`; ano dentro da barra. Usado em Magic Makers ao Vivo. |
| 9 | Grade de aulas | `#f4f8fc` | `gradeTitulo`, `grade` | Hoje é pendente em quase todos → no site final, montar lista de módulos/aulas quando houver conteúdo; senão ocultar. |
| 10 | Com quem você aprende | navy | `experts[]` = [nome, bio] | Cards com retrato 4:5 (raio 28px), nome Bricolage 28/800, bio. Um expert: card com no máximo 420px. Sócios usam as fotos de `assets/socios/`. |
| 11 | Prova social / Depoimentos | ciano | `prova`, `depoimentos` | Número grande de prova (se houver) + grade de 3 cards de depoimento (vídeo/foto + nome + agência). |
| 12 | Ferramentas | `#f4f8fc` | `ferramentas[]` = [id, nome, título, texto, botão, preço] | Só no hub `/ferramentas`. Cada card tem `id` para âncora (`scroll-margin-top: 100px`). |
| 13 | Investimento / Planos / Ingressos | branco | `investimento`, `extra`, `extraLink`, `planos[]`, `planosNota`, `ingressos[]`, `ingressosNota`, `parceiros` | `#investimento`. **Preço único:** bloco azul raio 32px com nome, preço gigante (Bricolage `clamp(40px,5vw,72px)`), botão branco e texto de upsell (`extra`, link opcional para outro programa). **Planos** (Magic Club) e **Ingressos** (MM ao Vivo): 3 cards; o último em destaque (fundo azul). Faixa de logos de patrocinadores quando houver. |
| 14 | Perguntas frequentes | `#f4f8fc` | `faq[]` = [pergunta, resposta] | Acordeão (ver 7.4). Gerar JSON-LD `FAQPage` só se o conteúdo estiver visível. |
| 15 | Chamada final | azul | `final` = [título, botão], `finalTexto`, `finalComece` | `#final`. Título Bricolage `clamp(40px,6vw,96px)`. Botão branco. Se `finalComece: true`, o botão leva para `/comece-aqui`. |

Páginas **"Em breve"** (`breve: true`: Excelência, Dubai) mostram só Hero + Introdução + Chamada final, com o botão de lista de espera ("Quero ser avisado do lançamento"). Implementar um formulário simples de captura (nome, e-mail, WhatsApp opcional, consentimento LGPD).

`<title>` = campo `seo` (ou "{nome} | Academia da Magia"); meta description conforme o PDF (`conteudo/Paginas_dos_programas.pdf`).

---

## 9. Dados / modelo de conteúdo

### `programas.json` (fonte atual)
Objeto indexado pelo slug. Campos (todos opcionais, exceto `nome`, `menu`, `selo`, `titulo`, `subtitulo`, `botao`, `final`):
```ts
type Programa = {
  nome: string; menu: 'Mentorias'|'Especializações'|'Destinos'|'Ferramentas'|'Comunidade';
  seo?: string; logo?: string; logoDark?: boolean; breve?: boolean; novo?: boolean; hub?: boolean;
  selo: string; titulo: string; subtitulo: string; botao: string; imagem?: string;
  contador?: string;                       // ISO date
  intro?: { titulo: string; texto: string };
  paraQuem?: string[];
  aprenderTitulo?: string; aprender?: string[]; aprenderNota?: string;
  etapas?: [nome: string, formato: string, texto: string][]; etapasNota?: string;
  grupos?: [titulo: string, texto: string][]; destinos?: string[];
  funciona?: [label: string, valor: string][];
  historia?: [edicao: string, ano: string, participantes: string][];
  gradeTitulo?: string; grade?: string;
  experts?: [nome: string, bio: string][];
  prova?: string; depoimentos?: string;
  investimento?: string; extra?: string; extraLink?: string;
  planos?: [nome: string, preco: string, sub: string][]; planosNota?: string;
  ingressos?: [nome: string, paraQuem: string, vagas: string, valor: string][]; ingressosNota?: string;
  parceiros?: string;
  ferramentas?: [id: string, nome: string, titulo: string, texto: string, botao: string, preco: string][];
  faq?: [pergunta: string, resposta: string][];
  final: [titulo: string, botao: string]; finalTexto?: string; finalComece?: boolean;
};
```
Trechos entre colchetes, como `[A PREENCHER]` e `[CONFIRMAR ...]`, são marcadores de pendência (ver seção 11).

### CMS (recomendado, conforme briefing)
Entidades separadas: **Programa**, **Turma/Edição** (datas, status: aberto / lista de espera / encerrado, link de checkout), **Expert/Pessoa** (nome, foto, bio, papel), **Depoimento** (autorizado), **Artigo**, **Categoria de blog**, **Ferramenta**, **Evento**, **Configurações globais** (links de WhatsApp, redes, Academia 365, Protagonistas). Status editorial (rascunho → revisão → publicado), data de revisão, URL canônica, redirecionamentos 301. Atualizar turma/preço sem reescrever a página do programa.

---

## 10. Interações e comportamento

| Elemento | Comportamento |
|---|---|
| Mega menu | Hover abre; sair do cabeçalho fecha; clique alterna (teclado/toque); Esc fecha; `aria-expanded`. |
| Menu mobile | Botão "Menu"/"Fechar"; painel rolável; fecha ao navegar. |
| Carrossel do hero | Crossfade de 1.2s; autoplay de 5.5s; pontos clicáveis; pausar/retomar; pausado com `prefers-reduced-motion`; sem transições nesse caso. |
| Cards do Comece aqui | Estado ativo segue hover/foco (transição de fundo/cor .2s). |
| FAQ | Um item aberto por vez; o primeiro abre por padrão. |
| Contador (MM ao Vivo) | Dias até `2027-05-15T09:00:00-03:00`, arredondados para cima, mínimo 0. |
| Âncoras | `#caminhos`, `#sobre`, `#quiz`, `#protagonistas`, `#blog`, `#investimento`, `#final`, âncoras das ferramentas. Rolagem suave (desligada com reduced-motion). |
| Hovers | Links de nav → `#7fd6fb`; botões conforme a tabela 7.3; links do rodapé → branco. |
| WhatsApp | Contextual (rodapé, "Ainda em dúvida?"). **Não** usar botão flutuante que cubra conteúdo. |

---

## 11. Conteúdo pendente (não publicar marcadores)

No protótipo, a prop `showPending` exibe etiquetas amarelas com as pendências. Em produção:
- **Nunca** renderizar `[A PREENCHER]` / `[CONFIRMAR]`.
- Campo apenas com marcador → ocultar o item/seção.
- Campo com texto + marcador → exibir só o texto **depois da confirmação da equipe**.

Pendências registradas no PDF (seção "O que falta para publicar"):
- Em todas as páginas: grade de aulas/encontros; depoimentos por programa (nome + agência, autorizados); confirmação de preços e parcelamento; fotos próprias (evitar imagens oficiais de Disney/Universal sem autorização).
- Magic Makers: formato, duração e valor da turma 2027; número atual de formados (hoje "mais de 700").
- AGIR: frequência dos encontros, gravação, valor do upgrade AGIR + IA.
- Excelência: expert e detalhes.
- Guias de Orlando (prático): valor, datas, duração.
- Creations: experts da nova versão.
- Money’s: bio da Priscila Vargas.
- Hands On: formato, duração, valor.
- Parqueamento: conteúdo, expert, formato, valor.
- Orlando Lucrativo, Rota Califórnia, Japão: datas dos próximos encontros ao vivo.
- Paris Além da Disney: bio da Carolina Guerra.
- Ferramentas: preços e links de checkout.
- Magic Club: benefícios e regra de cancelamento.
- Reality: próximas datas e valor.
- Magic Makers ao Vivo: valores dos ingressos, o que cada um inclui, patrocinadores 2027.
- Magic Makers Experience: datas, roteiro, vagas, valor.

Links globais pendentes: **Academia 365 (Área do aluno)**, **WhatsApp**, **Instagram**, **YouTube**, **Podcast**, **site oficial do Protagonistas**, links de **checkout/inscrição** de cada programa.

Fotos pendentes: slides 2–5 do hero, 4 portais da Home, Protagonistas, time de atendimento (Comece aqui), heroes de cada programa (o campo `imagem` descreve a foto ideal), retratos dos experts que não são sócios (Rebecca Cosendey, Luciana Ricco, Monica Coscarella, Priscila Vargas, Carolina Guerra), imagens de depoimentos e de artigos.

---

## 12. SEO, performance, acessibilidade e medição

- HTML estático para todo o conteúdo essencial; navegação por links reais (`<a href>`).
- `<title>` e meta description próprios por página (valores no PDF / `seo` no JSON); `lang="pt-BR"`; Open Graph; canonical; `sitemap.xml`; `robots.txt`; 404; redirects 301 de URLs antigas.
- Dados estruturados coerentes com o conteúdo visível: `Organization` (global), `BreadcrumbList` (programas), `Article` (blog), `FAQPage` (onde há FAQ visível), `Event` (Magic Makers ao Vivo). `Course` apenas se cumprir a documentação vigente do Google.
- Imagens: AVIF/WebP, `srcset`/`sizes`, `loading="lazy"` fora da primeira dobra, dimensões explícitas (evitar CLS). Pré-carregar a imagem do slide 1 do hero.
- Fontes auto-hospedadas com `font-display: swap`; pré-carregar Bricolage 800 e Montserrat 400/700.
- Metas: Core Web Vitals bons (LCP < 2.5s, INP < 200ms, CLS < 0.1) e WCAG 2.2 AA (contraste, foco visível, rótulos, alvos ≥ 44px, reduced motion).
- Eventos de analytics (GA4/GTM): `cta_comece_aqui`, `momento_card_click` (com momento), `programa_view`, `cta_inscricao_click` (slug), `lista_espera_submit` (slug), `whatsapp_click` (origem), `area_aluno_click`, `checkout_start`, `protagonistas_outbound`. Registrar UTM respeitando o consentimento (banner de cookies + LGPD).

---

## 13. Assets

Todos em `prototipo/assets/`:

| Arquivo | O que é | Observação |
|---|---|---|
| `academia-da-magia.png` | Selo/logo oficial Academia da Magia (497×356, transparente) | Cabeçalho (54px) e rodapé (72px). Pedir o SVG oficial. |
| `hero-socios.png` | Camila, Joice e Paulo sobre fundo azul estrelado | Slide 1 do hero. Pessoas no lado direito. |
| `socios/camila-moretti.jpg` | Retrato de Camila Moretti | |
| `socios/joice-ferreira.jpg` | Retrato de Joice Ferreira | |
| `socios/paulo-soares.jpg` | Retrato de Paulo Soares | O fundo tem um castelo pixelado. |
| `magic-makers.png` | Logo Magic Makers | Placa branca |
| `agir.png` | Logo AGIR (azul-claro) | **Placa navy** (`logoDark`) |
| `creations.png` | Logo Creations (amarelo + estrela) | Placa navy |
| `moneys.png` | Logo Money’s | Placa branca |
| `guiamento-virtual.png` | Logo Guiamento Virtual (branco + amarelo) | Placa navy |
| `guias-de-orlando.png` | Selo Guias de Orlando | Placa branca |
| `orlando-lucrativo.png` | Logo Orlando Lucrativo (3D) | Placa navy |
| `paris-alem-da-disney.png` | Logo Paris Além da Disney | Placa branca |

Programas sem logo (Mentoria de IA, Hands On, Parqueamento, DCL, Rota Califórnia, Japão, Dubai, Excelência, Magic Club, Reality, MM ao Vivo, MM Experience) mostram só selo + título; adicionar logo quando existir.

Otimizar todos os PNG/JPG no build (os originais são pesados).

---

## 14. Arquivos do pacote

```
design_handoff_site_academia_da_magia/
├── README.md                          ← este documento
├── prototipo/                         ← referências de design (servir via HTTP)
│   ├── Home v2.dc.html                ← Home
│   ├── Comece aqui.dc.html            ← /comece-aqui
│   ├── Programa.dc.html               ← template de programa (?p=<slug>)
│   ├── Header.dc.html                 ← cabeçalho + mega menu (fonte oficial da navegação)
│   ├── Footer.dc.html                 ← rodapé
│   ├── programas.json                 ← dados dos 21 programas
│   ├── image-slot.js, support.js      ← runtime do protótipo (não usar em produção)
│   └── assets/                        ← logos e fotos
└── conteudo/
    ├── programas.json                 ← mesma fonte de dados (para importar no CMS)
    ├── Paginas_dos_programas.pdf      ← copy oficial de todas as páginas (SEO title, meta, textos)
    ├── Paginas_dos_programas.txt      ← texto extraído do PDF
    └── Briefing_site_Academia_da_Magia.md ← briefing estratégico (arquitetura, quiz, SEO, CMS, medição)
```

Observação: `Home v2.dc.html` ainda contém lógica antiga de menu que não é usada. A navegação válida é a de `Header.dc.html`.

---

## 15. Ordem sugerida de implementação

1. Setup (Astro ou Next.js + Tailwind), tokens (seção 6), fontes auto-hospedadas.
2. Header (mega menu + mobile) e Footer.
3. Home completa.
4. Template de programa + geração estática das 21 rotas a partir de `programas.json`.
5. Comece aqui.
6. Blog (hub + artigo), Sobre, Contato, páginas legais, 404.
7. SEO técnico (metadados, sitemap, canonicals, JSON-LD), analytics e consentimento.
8. CMS e migração do JSON.
9. Preencher as pendências (seção 11) e remover tudo que ainda for marcador antes de publicar.
