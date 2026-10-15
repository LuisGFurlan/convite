# Convite pro cinema 🍿🐉

Página estática com um convite em formato de ingresso de cinema. Tem um botão "Sim" e um botão "Não" que foge do cursor ou do dedo. Quando a pessoa clica em "Sim", aparece a tela de sucesso com confete e, em seguida, o WhatsApp abre com a mensagem pronta.

HTML, CSS e JS puros, sem build step.

```
index.html        estrutura (o dragãozinho SVG fica inline num <template>)
css/style.css     visual
js/config.js      CONFIG: o único arquivo que precisa editar
js/main.js        botão fugitivo, tela de sucesso, WhatsApp, CallMeBot
js/confete.js     animação de confete
```

## Configurar

Edite `js/config.js`:

| Campo | O que é |
|---|---|
| `nome` | Nome que aparece no título e na tela de sucesso |
| `whatsapp` | Seu número com DDI + DDD, só dígitos (ex: `5547999999999`). Vazio esconde o botão e desativa a abertura automática |
| `mensagemZap` | Texto que já vem pronto no WhatsApp |
| `aviso.telefone` / `aviso.apikey` | Opcional. Aviso automático pra você via [CallMeBot](https://www.callmebot.com/blog/free-api-whatsapp-messages/). Só dispara se os dois estiverem preenchidos |

> O repositório é público, então o número e a apikey ficam visíveis no código.

## Testar localmente

```bash
npx serve .
```

Abra `http://localhost:3000`. Para testar no celular (o toque precisa ser validado num aparelho de verdade), conecte o celular na mesma rede Wi-Fi e abra `http://<IP-do-PC>:3000`.

## Publicar no GitHub Pages

1. Crie um repositório com nome neutro (ex: `pergunta`) e faça push da branch `main`.
2. No GitHub: **Settings → Pages → Build and deployment → Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Em um ou dois minutos o site fica em `https://<usuario>.github.io/pergunta/`.

Para tirar do ar: **Settings → Pages → Unpublish**, ou apague o repositório.
