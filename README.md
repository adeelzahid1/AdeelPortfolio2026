# Adeel Zahid Portfolio

Angular 20 + Bootstrap 5 + plain CSS developer portfolio (dark/light theme).

## Run locally

```bash
cd C:\Users\Adeel\Videos\NG\adeelzahid-portfolio
npm start
```

Open `http://localhost:4200`.

## Production build

```bash
npm run build
```

Output: `dist/adeelzahid-portfolio/browser`

## Deploy to Surge

```bash
npx surge dist/adeelzahid-portfolio/browser adeelzahid.surge.sh
```

## GitHub Actions CI/CD

Workflow: `.github/workflows/ci-cd.yml`

- Pull requests and pushes: production build
- Push to `main` / `master`: deploy `dist/adeelzahid-portfolio/browser` to [adeelzahid.surge.sh](https://adeelzahid.surge.sh)

### Secret (required for deploy)

GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

| Name | Value |
|---|---|
| `SURGE_TOKEN` | output of `npx surge token` |

Do not commit this token. After the secret is saved, push to `main` to trigger deploy.

## Notes

- Theme preference is stored in `localStorage` under `adeel-portfolio-theme`.
- Place your resume at `public/assets/AdeelZahid_ATS_Final.docx` (already copied from your New_Resume folder) for the Download Resume button.
- All styles use `.css` (no SCSS).
