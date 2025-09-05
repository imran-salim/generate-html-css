<div align="center">

# Generate HTML & CSS (AI‑Driven)

Spin up a tiny Express + TypeScript app that calls the OpenAI Responses API on every page load and renders a brand‑new, self‑contained HTML + CSS snippet. Hard refresh = an entirely different mini webpage.

</div>

## ✨ What You Get

- Fresh AI‑generated HTML + CSS on each visit to `/`
- Automatic cleanup of markdown code fences (```html / ```css)
- Basic rate limiting (50 req / 15 min / IP)
- Pug templating with direct (unescaped) injection zone
- TypeScript + ES Module build
- Docker image support
- Jest test scaffold (mocked OpenAI) verifying fenced output format

> This is a minimal demo. No persistence, forms, or customization UI—yet.

## 🧱 Tech Stack

| Layer | Choice |
|-------|--------|
| Runtime | Node.js 18+ |
| Framework | Express 4 |
| Templates | Pug |
| AI SDK | openai (Responses API) |
| Lang | TypeScript (strict) |
| Misc | express-rate-limit, morgan, cookie-parser |
| Tests | Jest + ts-jest |
| Container | Node 18 Alpine |

## 🗺 How It Works

1. Client requests `/`.
2. `routes/index.ts` builds an OpenAI client with `OPENAI_API_KEY`.
3. Calls `responses.create` with fixed instructions to return only HTML + CSS.
4. Regex strips all fenced code blocks & language tags.
5. Clean markup is injected into `views/index.pug` via `!{response}`.

Key files:
- `app.ts` – Express setup (views, static, middleware, limiter, error handling)
- `routes/index.ts` – OpenAI call + response cleaning
- `bin/www.ts` – HTTP server bootstrap + port normalization
- `views/` – Pug templates (`layout`, `index`, `error`)
- `public/stylesheets/style.css` – Global styles
- `tests/routes/index.jest.ts` – Example mocked response tests

## 🔐 Security Notes

- AI output is unescaped (`!{response}`) → arbitrary HTML (and inline scripts) will execute if the model returns them. For public deployment add an allow‑list or sanitize with a library like `sanitize-html`.
- Rate limiting is basic; tune `limit` and `windowMs` for production.
- Never commit your real `OPENAI_API_KEY`.

## 📂 Structure

```
app.ts
bin/www.ts
routes/index.ts
views/
public/stylesheets/
tests/
Dockerfile
tsconfig.json
package.json
```

## 🔑 Environment

Create `.env` in the project root:

```
OPENAI_API_KEY=sk-...
# Optional
PORT=3000
```

The server will respond 500 if the key is missing.

## 🚀 Quick Start

```bash
git clone https://github.com/imran-salim/generate-html-css.git
cd generate-html-css
npm install
echo "OPENAI_API_KEY=sk-..." > .env
npm start
```

Open http://localhost:3000 and refresh to generate new pages.

## 🐳 Docker

```bash
docker build -t generate-html-css .
docker run --rm -p 3000:3000 -e OPENAI_API_KEY=sk-... generate-html-css
```

Browse to http://localhost:3000

## 📦 Scripts

| Script | What it does |
|--------|--------------|
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Build then launch server (`dist/bin/www.js`) |
| `npm test` | Run Jest tests (OpenAI mocked) |

Suggested (not included—add if you like):

```jsonc
"dev": "ts-node --esm bin/www.ts" // or nodemon/ts-node-dev
```

## 🧪 Testing

The existing test mocks OpenAI and asserts that fenced HTML and CSS blocks appear and close properly. Extend with supertest to hit the real route once you add HTTP tests.

Run:

```bash
npm test
```

## ⚙️ Configuration Tweaks

Edit `routes/index.ts` to adjust:
- `model` (e.g. upgrade to `gpt-4o-mini`)
- `instructions` (tone / constraints)
- Rate limits in `app.ts`

Switch to streaming by using `client.responses.stream(...)` and progressively flushing to the response (not implemented here).

## 🚧 Roadmap / Ideas

- Prompt customization form + POST route
- Output download / copy button
- Sanitization / content policy enforcement
- Token streaming to client
- Caching / ETag for repeated prompts
- Model selection dropdown
- Add `dev` watch script
- Supertest integration tests

## � License

MIT – see `LICENSE`.

## 👤 Author

Imran Salim

---

PRs & issues welcome.
