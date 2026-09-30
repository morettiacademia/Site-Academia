# Como publicar no blog

O blog tem um painel próprio em **https://academiadamagia.com.br/admin**. Não é preciso mexer em código: o artigo é escrito num editor visual e, ao salvar, o site se atualiza sozinho em 2 a 4 minutos.

O painel (Sveltia CMS) tem os menus em inglês. Os campos do artigo estão em português.

## Primeiro acesso (uma vez por pessoa)

O painel usa uma conta do **GitHub** (gratuita) para saber quem está publicando.

1. **Crie uma conta** em github.com, se ainda não tiver.
2. **Peça acesso ao responsável pelo site.** Ele convida sua conta no repositório `morettiacademia/Site-Academia` (**Settings → Collaborators → Add people**, permissão **Write**). Aceite o convite que chega por e-mail.
3. **Crie a sua chave de acesso.** No GitHub, clique na sua foto e vá em **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**:
   - **Token name:** `Painel do blog`
   - **Expiration:** 1 ano (ou o prazo que preferir)
   - **Resource owner:** `morettiacademia`
   - **Repository access:** *Only select repositories* → `Site-Academia`
   - **Permissions → Repository permissions → Contents:** *Read and write*

   Clique em **Generate token** e copie a chave (começa com `github_pat_`). Ela só aparece uma vez.
4. Acesse **academiadamagia.com.br/admin**, clique em **Sign In Using Access Token**, cole a chave e entre. O navegador guarda o login para as próximas vezes.

> Se a opção "morettiacademia" não aparecer em *Resource owner*, um dono da organização precisa liberar os tokens em **github.com/morettiacademia → Settings → Personal access tokens**. Outra saída é usar um token "classic" com o escopo `repo`.

## Escrever e publicar

1. No painel, abra **Artigos do blog** e clique em **New** (novo artigo).
2. Preencha:
   - **Título**
   - **Resumo**: uma ou duas frases. Aparece no Google e nos cards do blog.
   - **Categoria**
   - **Data de publicação**
   - **Imagem de capa**: horizontal, de preferência 1600 × 1200 px. O site otimiza sozinho.
   - **Descrição da imagem**: uma frase dizendo o que aparece na foto (acessibilidade).
   - **Texto do artigo**: use os botões do editor para títulos, negrito, listas, links e imagens.
3. Enquanto estiver escrevendo, deixe **Rascunho** ligado e clique em **Save**. Rascunhos não aparecem no site.
4. Para publicar: desligue **Rascunho** e clique em **Save**. Em 2 a 4 minutos o artigo aparece em `/blog` e os três mais recentes aparecem na Home.

Para editar ou apagar um artigo, abra-o na lista do painel.

Para tirar o acesso de alguém, remova a pessoa dos Collaborators do repositório.

> Observação técnica: o painel salva na branch configurada em `public/admin/config.yml` (`backend.branch`). Se o site passar a ser publicado a partir de outra branch (por exemplo `main`), atualize esse campo e o arquivo `.github/workflows/publicar-godaddy.yml`.
