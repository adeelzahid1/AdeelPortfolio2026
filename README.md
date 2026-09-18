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

## Notes

- Theme preference is stored in `localStorage` under `adeel-portfolio-theme`.
- Place your resume at `public/assets/AdeelZahid_ATS_Final.docx` (already copied from your New_Resume folder) for the Download Resume button.
- All styles use `.css` (no SCSS).
