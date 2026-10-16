# Palavra do Céu

Página do QR Code do drone (@_hrdrone): "Uma palavra do céu para você". Página única, em português (NTLH), com i18n já preparado para outros idiomas.

O protótipo original (HTML/CSS/JS puros com GSAP e Lenis por CDN) está guardado em [`prototipo/`](prototipo/).

## Rodar

Requer **Node 24** (`nvm use`; o npm 10 que vem com o Node 22.16 quebra na instalação).

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # gera o site estático em .output/public
npm run preview
```

## Stack

| Parte | Tecnologia |
|---|---|
| Base | Nuxt 4.3 (`<script setup>`, modo SPA), Vite 7, Tailwind CSS 3 com preset próprio (`tailwind.preset.js`) + PostCSS + Autoprefixer |
| Rotas | vue-router 4 (o do Nuxt). Atalhos `/oracao`, `/esperanca`… redirecionam para `/#oracao`; links antigos e endereços desconhecidos voltam para `/` mantendo a âncora (`app/router.options.ts`) |
| Idiomas | vue-i18n 11 (`app/i18n/`). Idioma salvo no `localStorage` |
| Estado | `ref` do Vue em `app/lib/state.ts`, sem Pinia |
| Animação | GSAP 3 + ScrollTrigger + SplitText, `quickTo` e `gsap.matchMedia()`; Lenis (rolagem suave); Motion para Vue (`motion-v`); diretiva `v-magnetic` |
| Navegador | SVG (rota do drone e ícones), Clipboard API, `localStorage`/`sessionStorage`, `matchMedia` (reduzir movimento e mouse), eventos de ponteiro (cursor e arrastar o cartão) |
| Fontes | Archivo (largura variável), Manrope e JetBrains Mono (Google Fonts) |
| Hospedagem | Vercel, com `vercel.json` |

### Onde cada recurso aparece

- **SplitText**: títulos que sobem linha por linha (`data-split`), letras da abertura (que se alargam no eixo `wdth` do Archivo) e a frase do Propósito, que acende palavra por palavra.
- **ScrollTrigger**: parallax dos círculos, cartões que chegam girando, rota do drone que se desenha na abertura, sol final e barra de progresso.
- **Motion (`motion-v`)**: troca do versículo sorteado (o cartão também pode ser arrastado para o lado), estados da autorização de imagem, aviso (toast) e seletor de idioma.
- **`quickTo`**: cursor em forma de mira e botões magnéticos. **`matchMedia`**: com "reduzir movimento" ligado, as animações, o Lenis e o cursor ficam desligados.
- **Armazenamento**: a abertura aparece uma vez por visita (`sessionStorage`), e a resposta da autorização e o idioma ficam salvos (`localStorage`). As chaves são as mesmas do protótipo.

## Onde mudar cada coisa

| Quero mudar… | Arquivo |
|---|---|
| WhatsApp, Instagram, abertura ligada/desligada, lembrar autorização | `app/data/site.ts` |
| Formulário da autorização / envio para a planilha | `app/components/sections/ConsentSection.vue`, `app/composables/useConsentRecord.ts`, `google-apps-script/Code.gs` |
| Textos e versículos | `app/i18n/locales/pt-BR.ts` |
| Cores de cada tema | `app/data/themes.ts` |
| Paleta e fontes | `tailwind.preset.js` |
| Animações de rolagem genéricas | `app/composables/useScrollReveal.ts` |

**Adicionar um idioma:** crie `app/i18n/locales/<código>.ts` com as mesmas chaves de `pt-BR.ts` e adicione-o em `LOCALES` e `messages` (`app/i18n/index.ts`). O seletor de idioma aparece sozinho no topo quando houver mais de um.

## Autorizações de imagem (planilha Google)

Quem toca em "Sim, eu autorizo" precisa preencher **nome e sobrenome**. O site envia esses dados para um Google Apps Script, que grava uma linha na planilha:

| Data/hora | Nome | Sobrenome | Situação | Idioma |
|---|---|---|---|---|
| 16/10/2026 14:32:10 | Maria | Silva | Autorizou | pt-BR |

Se a pessoa tocar em "Mudar minha resposta" depois de autorizar, entra uma linha **Revogou** com o mesmo nome. Vale sempre a linha mais recente de cada pessoa. Se o envio falhar (sem internet, por exemplo), ela vê um aviso e pode tentar de novo; a autorização só é confirmada depois que a planilha responde.

### Configurar (uma vez)

1. Crie uma planilha no [Google Planilhas](https://sheets.new).
2. Menu **Extensões → Apps Script**. Apague o que estiver lá, cole o conteúdo de [`google-apps-script/Code.gs`](google-apps-script/Code.gs) e salve.
3. **Implantar → Nova implantação**, engrenagem → **App da Web**:
   - *Executar como*: **Eu**
   - *Quem pode acessar*: **Qualquer pessoa**
4. Autorize o acesso quando o Google pedir e copie a **URL do app da Web** (termina em `/exec`). Abrir essa URL no navegador deve mostrar `{"ok":true}`.
5. Cole a URL:
   - no seu computador: copie `.env.example` para `.env` e preencha `NUXT_PUBLIC_CONSENT_SHEET_URL`;
   - na Vercel: *Settings → Environment Variables* → `NUXT_PUBLIC_CONSENT_SHEET_URL`, depois faça um novo deploy (a URL entra no site na hora do build).

A aba "Autorizações" é criada sozinha no primeiro envio. **Se você editar o `Code.gs` depois**, publique de novo em *Implantar → Gerenciar implantações → editar (lápis) → Nova versão*. Assim a URL continua a mesma.

Sem a variável configurada, o formulário mostra o aviso de erro e nada é salvo.

### Cuidados

- A URL do script fica visível no código do site, como qualquer formulário público. O script só aceita nome e sobrenome curtos, ignora envios de robôs (campo invisível no formulário) e impede que um texto vire fórmula na planilha.
- São dados pessoais (LGPD). Compartilhe a planilha só com quem precisa e apague as linhas quando não forem mais necessárias.

## Publicar na Vercel

Importe o repositório. O `vercel.json` já define o build (`npm run build`), a pasta `.output/public`, o rewrite para `index.html` (os atalhos como `/oracao` funcionam ao recarregar) e o cache longo de `/_nuxt/*`. Em *Settings → Node.js Version*, escolha 24.x, e configure a variável `NUXT_PUBLIC_CONSENT_SHEET_URL` (ver acima).

## Do protótipo para cá

- Mesmo conteúdo, ordem e cores do `Palavra do Ceu v2.dc.html`.
- As fontes mudaram de Caprasimo/Figtree para Archivo/Manrope/JetBrains Mono, como pede a stack.
- **Novidades:** rota do drone na abertura, cursor de mira, botões magnéticos, cartão de versículo arrastável, botão de copiar o telefone e atalhos de URL por seção.
