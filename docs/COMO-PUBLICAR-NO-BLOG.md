# Como publicar no blog

O blog tem um painel próprio em **https://academiadamagia.com.br/admin**. Não é preciso mexer em código: o artigo é escrito num editor visual e, ao publicar, o site se atualiza sozinho em 1 a 2 minutos.

## Para quem vai escrever (marketing)

1. Acesse **academiadamagia.com.br/admin** e clique em **Entrar com o GitHub**.
2. Clique em **Novo Artigo**.
3. Preencha:
   - **Título**
   - **Resumo**: uma ou duas frases. Aparece no Google e nos cards do blog.
   - **Categoria**
   - **Data de publicação**
   - **Imagem de capa**: horizontal, de preferência 1600 × 1200 px. O site otimiza sozinho.
   - **Descrição da imagem**: uma frase dizendo o que aparece na foto (acessibilidade).
   - **Texto do artigo**: use os botões do editor para títulos, negrito, listas, links e imagens.
4. Enquanto estiver escrevendo, deixe **Rascunho** ligado e clique em **Salvar**. Rascunhos não aparecem no site.
5. Para publicar: desligue **Rascunho** e clique em **Salvar**. Em 1 a 2 minutos o artigo aparece em `/blog` e os três mais recentes aparecem na Home.

Para editar ou apagar um artigo, abra-o na lista do painel.

## Configuração (uma vez só, feita pelo responsável técnico)

O login do painel usa contas do GitHub. Depois que o site estiver na Netlify:

1. **Criar o app de login no GitHub.** Em github.com, vá em **Settings → Developer settings → OAuth Apps → New OAuth App** e preencha:
   - Application name: `Painel Academia da Magia`
   - Homepage URL: `https://academiadamagia.com.br`
   - Authorization callback URL: `https://api.netlify.com/auth/done`

   Salve e copie o **Client ID**. Gere um **Client secret** e copie também.
2. **Ligar na Netlify.** No site, vá em **Site configuration → Access & security → OAuth → Install provider → GitHub** e cole o Client ID e o Client secret.
3. **Dar acesso a quem vai escrever.** A pessoa cria uma conta gratuita no GitHub. No repositório `morettiacademia/Site-Academia`, vá em **Settings → Collaborators → Add people**, convide a conta dela com permissão **Write** e peça que ela aceite o convite recebido por e-mail.

Para tirar o acesso de alguém, é só remover a pessoa dos Collaborators.

> Observação: o painel publica na branch configurada em `public/admin/config.yml` (`backend.branch`). Se o site passar a ser publicado a partir de outra branch (por exemplo `main`), atualize esse campo.
