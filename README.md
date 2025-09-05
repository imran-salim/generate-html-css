<div align="center">

# Generate HTML & CSS (AI-driven)

Generate a fresh, self‑contained HTML + CSS snippet on every page load using the OpenAI API. The server calls the OpenAI Responses API, strips markdown fences, and streams the result directly into a Pug template so you instantly see a rendered webpage.

</div>

## ✨ Features

- AI‑generated HTML + CSS on each visit to `/`
- Cleans model output (removes ``` fences and language tags)
- Basic rate limiting (50 requests / 15 min per IP)
- Pug view layer with simple injection point
- TypeScript codebase (compiled to ES modules)
- Docker support for containerized runs

> Note: There is currently no persistent state, prompt customization UI, or download button. Each refresh triggers a brand‑new generation.

## 🧱 Stack

- Node.js + Express
- TypeScript (strict mode)
- Pug templates
- OpenAI SDK (`responses.create` with `gpt-3.5-turbo`)
- express-rate-limit, morgan, cookie-parser
- Docker (Node 18 Alpine)

## 🗺 Architecture Overview

Request Flow:
1. Browser hits `/`.
2. Route handler (`routes/index.ts`) creates an OpenAI client using `OPENAI_API_KEY`.
3. Calls `client.responses.create` with fixed instructions asking only for HTML + CSS.
4. Strips any markdown code fences from `response.output_text`.
5. Renders `views/index.pug`, injecting the raw markup inside the template.

Key Components:
- `app.ts`: Express app setup (Pug engine, middleware, rate limiter, static assets, error handling).
- `bin/www.ts`: Server bootstrap (port normalization + HTTP server events).
- `routes/index.ts`: Core generation logic via OpenAI.
- `views/*.pug`: Layout + index + error pages.
- `public/stylesheets/style.css`: Minimal global styles.

Security / Safety Considerations:
- AI output is injected with `!{response}` (unescaped). Malicious or unexpected HTML / inline scripts could execute. Consider sanitizing or restricting model output if exposed publicly.
- Rate limiting is present but conservative; adjust `limit` / `windowMs` as needed.

## 📂 Project Structure

```
app.ts                # Express app definition
bin/www.ts            # Startup script (compiled to dist/bin/www.js)
routes/index.ts       # Single route performing OpenAI call
views/                # Pug templates (layout, index, error)
public/stylesheets/   # Static CSS
Dockerfile            # Container build
tsconfig.json         # TypeScript configuration
package.json          # Scripts + dependencies
.env                  # (Not committed) holds OPENAI_API_KEY, PORT
```

## 🔑 Environment Variables

Create a `.env` file in the project root:

```
OPENAI_API_KEY=your_openai_key_here
# Optional (defaults to 3000)
PORT=3000
```

The app will fail at runtime if `OPENAI_API_KEY` is missing (OpenAI call throws).

## 🚀 Getting Started (Local)

Prereqs: Node.js 18+ (ESM + modern TS target) and npm.

```
git clone https://github.com/imran-salim/generate-html-css.git
cd generate-html-css
npm install
cp .env.example .env  # (if you create one) otherwise create manually
echo "OPENAI_API_KEY=sk-..." >> .env
npm start
```

Visit: http://localhost:3000

Each refresh = new AI-generated page.

## 🐳 Run with Docker

Build & run:

```
docker build -t generate-html-css .
docker run --rm -p 3000:3000 -e OPENAI_API_KEY=sk-... generate-html-css
```

Then open http://localhost:3000

## 📦 NPM Scripts

| Script  | Description |
|---------|-------------|
| build   | Compile TypeScript to `dist/` |
| start   | Build then start server using compiled output |

## 🔄 Development Tips

- For faster iteration you can add a `dev` script with `ts-node-dev` or `nodemon` (not included yet).
- Adjust model or instructions in `routes/index.ts` to influence style / complexity.
- Add output sanitization if exposing publicly.
- Switch to newer OpenAI model (e.g. `gpt-4o-mini`) by updating the `model` field.

## ⚠️ Limitations / Future Ideas

- No user prompt customization (could add a form + POST route).
- No caching; every request bills the API.
- No HTML sanitization (consider `sanitize-html`).
- Missing tests (could add Jest + supertest for route).
- Could stream tokens instead of waiting for full response.

## 📝 License

MIT – see `LICENSE`.

## 👤 Author

Imran Salim

---

Feel free to open issues or PRs for enhancements.
