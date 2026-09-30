# Publicar o site na hospedagem da GoDaddy

O site é gerado automaticamente pelo GitHub e enviado por FTP para a hospedagem da GoDaddy. Isso acontece a cada mudança no repositório, inclusive quando o marketing publica um artigo pelo painel do blog. Ninguém precisa enviar arquivos manualmente.

**Requisito:** plano de hospedagem com **cPanel** (Linux, com FTP e PHP). O "Construtor de sites" da GoDaddy não serve.

## 1. Dados de FTP na GoDaddy

1. Entre na GoDaddy e vá em **Meus produtos → Hospedagem na Web → Gerenciar → cPanel Admin**.
2. No cPanel, abra **Contas FTP** e crie uma conta só para o site, por exemplo `deploy@academiadamagia.com.br`:
   - **Diretório:** `public_html`. Apague o que o cPanel sugerir depois de `public_html`.
   - Anote a **senha**.
3. Anote o **servidor FTP**. Ele aparece em "Configurar cliente FTP" e costuma ser `ftp.academiadamagia.com.br` ou o IP do servidor.

> **Faça um backup antes.** Se já existe um site em `public_html`, baixe uma cópia pelo Gerenciador de Arquivos do cPanel (selecione tudo → Compactar → Baixar). A publicação substitui a página inicial e os arquivos com o mesmo nome, mas não apaga pastas de outros sites, como as dos subdomínios.

## 2. Senhas e configurações no GitHub

No repositório `morettiacademia/Site-Academia`, vá em **Settings → Secrets and variables → Actions**.

**Aba "Secrets"** (informações que ficam escondidas) → **New repository secret**:

| Nome | Valor |
|---|---|
| `FTP_SERVER` | servidor FTP (ex.: `ftp.academiadamagia.com.br`) |
| `FTP_USERNAME` | usuário FTP criado no passo 1 |
| `FTP_PASSWORD` | senha do usuário FTP |

**Aba "Variables"** (informações do site) → **New repository variable**:

| Nome | Valor |
|---|---|
| `PUBLIC_WHATSAPP_NUMERO` | WhatsApp do atendimento, só números com DDI e DDD (ex.: `5511999998888`) |
| `PUBLIC_ACADEMIA365_URL` | link da Área do aluno |
| `PUBLIC_INSTAGRAM_URL`, `PUBLIC_YOUTUBE_URL` | links das redes (opcional) |
| `PUBLIC_GTM_ID` | ID do Google Tag Manager (opcional) |
| `FTP_DIR` | só se a pasta não for `public_html/` (a barra final é obrigatória) |
| `FTP_PROTOCOL` | só se o envio falhar com `ftps`: use `ftp` |

## 3. Primeira publicação

Vá em **Actions → Publicar na GoDaddy → Run workflow**. Em 2 a 4 minutos o site está no ar. A partir daí, cada mudança publica sozinha.

Para acompanhar ou ver erros, abra a aba **Actions**: verde significa publicado, vermelho mostra o motivo.

## 4. Domínio

Se o domínio e a hospedagem estão na mesma conta da GoDaddy, o domínio normalmente já aponta para a hospedagem. Se não apontar, no DNS do domínio o registro **A `@`** deve apontar para o IP da hospedagem, que aparece no cPanel em "Informações gerais". **Não altere** os registros MX (e-mail) nem os dos subdomínios (`agir`, `mentoria`, `magicmakersaovivo27`).

Para ativar o HTTPS, use no cPanel **SSL/TLS Status → Run AutoSSL**, se o certificado ainda não estiver ativo. O site já redireciona tudo para `https://` e tira o `www`.

## 5. Formulários

Os formulários de **Contato** e **Lista de espera** são enviados pelo arquivo `public/enviar.php`:

- chegam por e-mail em **`diretoria@academiadamagia.com.br`**. Para trocar, edite `$DESTINO` no topo do arquivo;
- ficam guardados também em planilhas CSV na pasta `formularios-site`, **fora** do `public_html` (Gerenciador de Arquivos, um nível acima). Assim nenhum contato se perde se um e-mail falhar.

Se os e-mails não chegarem, confira no cPanel se existe a conta de e-mail **`site@academiadamagia.com.br`** (o remetente). Crie a conta se for preciso, ou troque `$REMETENTE` por um e-mail que já exista no domínio.
