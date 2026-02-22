# Copilot Instructions

## Project context
- This is a minimal Express app with static frontend assets in `public/`.
- Start command is `npm start` and tests run with `npm test`.

## Testing conventions
- Use the built-in Node test runner (`node --test`).
- DOM-oriented unit tests use `jsdom` and live under `test/`.

## Deployment decisions (captured from project setup)
- AWS App Runner deployment for this project is configured using **App Runner console/API values**, not `apprunner.yaml`.
- Do not re-introduce `apprunner.yaml` unless explicitly requested.
- For App Runner manual config, use:
  - Build command: `npm install --production`
  - Start command: `node index.js`
  - Port: `3000`
  - Health check path: `/health`

## Metadata consistency
- Keep project naming consistent as `red-green-buttons` across:
  - `README.md` title
  - `package.json` name/description
  - `public/index.html` title/description
  - `public/site.webmanifest` name/description
