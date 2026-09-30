# Publicar o site (GitHub Pages + domínio na GoDaddy)

O site fica hospedado de graça no **GitHub Pages**. A cada mudança no repositório, inclusive quando o marketing publica um artigo pelo painel do blog, o GitHub gera e publica o site sozinho em 2 a 4 minutos. O domínio continua registrado na GoDaddy; só muda para onde ele aponta.

## 1. Ligar o GitHub Pages (uma vez)

1. No repositório **morettiacademia/Site-Academia**, vá em **Settings → Pages**.
2. Em **Build and deployment → Source**, escolha **GitHub Actions**.
3. Em **Custom domain**, digite `academiadamagia.com.br` e clique em **Save**. Pode aparecer um aviso de DNS; ele some depois do passo 2.

## 2. Apontar o domínio na GoDaddy (uma vez)

Na GoDaddy, abra **Domínios → academiadamagia.com.br → DNS**. Se o painel mostrar o domínio conectado a um "Site externo", desconecte-o para liberar os registros.

1. **Registros A com nome `@`:** apague o que aponta para `185.173.111.124` e crie estes 4, um para cada IP:

   | Tipo | Nome | Valor |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |

2. **Registro `www`:** apague o registro A ou CNAME `www` que existir e crie:

   | Tipo | Nome | Valor |
   |---|---|---|
   | CNAME | `www` | `morettiacademia.github.io` |

3. **Não mexa** nos registros MX (e-mail), TXT, nem nos de `agir`, `mentoria` e `magicmakersaovivo27`.

A troca leva de alguns minutos a algumas horas. Depois, volte em **Settings → Pages** e marque **Enforce HTTPS** quando a opção ficar disponível.

## 3. Publicar

Vá em **Actions → Publicar o site → Run workflow**. Nas próximas vezes, a publicação é automática.

## 4. Formulários

Os formulários de **Contato** e **Lista de espera** são entregues por e-mail pelo **FormSubmit** (gratuito) para **diretoria@academiadamagia.com.br**.

- **Ativação:** no **primeiro envio**, o FormSubmit manda um e-mail de ativação para esse endereço. Clique em **Activate Form** uma única vez. Depois disso, todos os envios chegam normalmente.
- **Trocar o e-mail:** altere `FORM_EMAIL` em `src/lib/site.ts`.

## 5. Configurações do site

Em **Settings → Secrets and variables → Actions → Variables**:

| Nome | Valor |
|---|---|
| `PUBLIC_WHATSAPP_NUMERO` | WhatsApp do atendimento, só números com 55 e DDD (ex.: `5511999998888`) |
| `PUBLIC_ACADEMIA365_URL` | link da Área do aluno |
| `PUBLIC_INSTAGRAM_URL`, `PUBLIC_YOUTUBE_URL` | links das redes (opcional) |
| `PUBLIC_GTM_ID` | ID do Google Tag Manager (opcional) |

Depois de mudar uma variável, rode **Actions → Publicar o site → Run workflow** para aplicar.
