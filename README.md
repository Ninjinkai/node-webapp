# red-green-buttons

[![CI](https://github.com/Ninjinkai/red-green-buttons/actions/workflows/ci.yml/badge.svg)](https://github.com/Ninjinkai/red-green-buttons/actions/workflows/ci.yml)

Minimal Express web app scaffold.

## Deployment notes

- AWS App Runner for this repo is currently managed using App Runner console/API configuration values.
- Repository config file deployment via `apprunner.yaml` was removed.
- Recommended App Runner values for this app:
	- Build command: `npm install --production`
	- Start command: `node index.js`
	- Port: `3000`
	- Health check path: `/health`

Run:

```bash
npm install
npm start
```

Visit http://localhost:3000
