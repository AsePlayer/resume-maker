# Resume Maker

A local browser-based resume builder built with React, TypeScript, and Vite.

The project is currently focused on making a strong single-user resume editor that runs in the browser, saves locally, exports/imports structured JSON, and prints a clean resume to PDF through the browser print flow.

## Current Status

Resume Maker is an early but functional app. The main workflow works:

1. Edit resume fields in the left editor panel.
2. See a live resume preview on the right.
3. Reorder experience, education, and skills with drag-and-drop.
4. Collapse experience and education cards for easier scanning/reordering.
5. Sort experience with **Sort newest first**.
6. Save automatically in browser local storage.
7. Import/export resume JSON files.
8. Print/export the resume through a dedicated print document.

## Tech Stack

- React
- TypeScript
- Vite
- Vitest
- GitHub Actions
- GitHub Pages

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

Run the full local verification flow:

```powershell
npm run push:check
```

`push:check` runs lint, unit tests, production build, and regenerates local text test outputs.

## Scripts

```text
npm run dev          Start the Vite dev server.
npm run build        Type-check and create a production build.
npm run lint         Run ESLint.
npm run test         Run Vitest unit tests.
npm run test:output  Regenerate local text test outputs.
npm run verify       Run lint, tests, and build.
npm run push:check   Run verify and regenerate test-output/.
npm run preview      Preview the production build locally.
```

## Project Structure

```text
src/
  app/
    App.tsx          Top-level app state and event wiring.
    App.css          Main app, editor, preview, responsive, and print styling.
  components/
    EditorPanel.tsx  Editable form UI, drag/drop, collapse controls, imports/exports.
    ResumePreview.tsx Live resume preview.
  data/
    initialResume.ts Starter resume data and basic field definitions.
  hooks/
    useResumeAutosave.ts Local storage autosave/load/reset behavior.
  styles/
    global.css       Global browser/body styles.
  types/
    resume.ts        Resume, experience, education, skill, and field types.
  utils/
    experienceSort.ts      Experience date parsing and newest-first sorting.
    experienceSort.test.ts Unit tests for experience sorting.
    printResume.ts         Dedicated HTML print document for PDF/browser print.
    resumeData.ts          Current resume JSON validation and serialization.
```

## Data Model

The current resume shape is structured. Imports/autosave must match this shape; there is no backward compatibility layer for older experimental formats.

```ts
type Resume = {
  name: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  summary: string
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: SkillItem[]
}
```

Experience entries include `role`, `company`, `dates`, and bullet `details`.

Education entries include `school`, `credential`, and bullet `details`.

Skills are individual items with an `id` and `name`.

## Features

- Editable basics: name, title, email, phone, location, website, summary.
- Structured experience cards.
- Structured education cards.
- Structured skill rows.
- Drag-and-drop reordering for experience, education, and skills.
- Collapsible experience and education cards.
- Experience **Sort newest first** action.
- Local browser autosave with reset.
- Resume JSON import/export.
- Live resume preview.
- Dedicated print/PDF document generated from semantic HTML.
- GitHub Actions CI for lint, tests, and build.
- GitHub Pages deployment from `main`.

## Testing

Unit tests currently cover experience sorting:

- Current roles sort before completed roles.
- Completed roles sort by latest end year.
- Matching end years use start year as a tie breaker.
- Unknown or unclear dates sort last.
- Experience sorting does not mutate the original list.
- `Present`, `Current`, and `Now` count as active roles.

Run tests:

```powershell
npm run test
```

Generate readable local test-output files:

```powershell
npm run test:output
```

Text outputs are written to `test-output/`, which is cleared at the start of each run. This folder is ignored by Git and is meant for local inspection.

## Print / PDF Notes

The `Print / PDF` button uses `src/utils/printResume.ts` to open a dedicated print document containing normal HTML text. This avoids printing the full interactive app shell.

For best selectable-text output, use the browser print dialog's built-in **Save to PDF** destination. Some system PDF printers can flatten output differently depending on driver behavior.

## GitHub Workflow

- Main branch: `main`
- Remote: `origin`
- CI workflow: `.github/workflows/ci.yml`
- Pages workflow: `.github/workflows/deploy-pages.yml`

Before pushing meaningful changes, run:

```powershell
npm run push:check
```

## Deployment

The app deploys to GitHub Pages from `main` using GitHub Actions.

GitHub Pages should be configured with:

```text
Build and deployment source: GitHub Actions
```

The deployed URL should be:

```text
https://aseplayer.github.io/resume-maker/
```

## Current Design Decisions

- Keep everything client-side for now.
- Store resume data locally in browser storage.
- Use JSON import/export instead of a backend database.
- Keep the data model strict and current; old experimental formats are not migrated.
- Prefer small focused utilities over large abstractions.
- Keep generated build/test-output folders out of Git.

## Likely Next Steps

- Add template architecture, starting with a `ClassicTemplate`.
- Move preview and print rendering toward shared template components.
- Add tests for JSON validation/import/export.
- Add tests for print document generation.
- Improve drag/drop affordances and keyboard accessibility.
- Add stronger date parsing if month-level sorting becomes important.
- Add more resume templates once the single-template flow feels polished.
