# Resume Maker

A local browser-based resume builder built with React, TypeScript, and Vite.

## Development

Install dependencies:

```powershell
npm install
```

Start the local dev server:

```powershell
npm run dev
```

Create a production build:

```powershell
npm run build
```

Run automated checks:

```powershell
npm run verify
```

Generate local text test outputs:

```powershell
npm run test:output
```

Text outputs are written to `test-output/`, which is cleared at the start of each run.

## Deployment

The app deploys to GitHub Pages from `main` using GitHub Actions.

## Current Features

- Editable resume fields
- Live resume preview
- Local browser autosave
- Import / export resume JSON files
- Structured experience, education, and skills sections
- Drag-and-drop section reordering with button fallbacks
- Browser print / PDF export
- TypeScript data model for the resume shape

## Test Coverage

- Experience sorting places current roles first.
- Completed experience sorts by latest end year.
- Matching end years use start year as a tie breaker.
- Unknown or unclear experience dates sort last.
- Experience sorting does not mutate the original list.
- Text test outputs document expected sort and readable-text scenarios.
