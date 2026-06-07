# Workspace Instructions

## Project Context

- This repo is `resume-maker`, a React + TypeScript + Vite browser app.
- The app is intended to run locally first, with GitHub used for version control.
- The user is learning this stack and appreciates brief explanations of why choices are being made.

## Working Style

- Edit files proactively when the requested change is clear.
- Explain important setup, architecture, and workflow decisions in plain language.
- Prefer small, focused commits with clear messages.
- Keep the repo clean and push completed, verified work to GitHub when appropriate.
- Use the correct repo path: `D:\Coding\Github\resume-maker`.

## Safety Rules

- Do not perform destructive actions without explicit confirmation.
- Destructive actions include deleting broad folders, resetting git history, force pushing, overwriting unknown user work, or installing/removing system-level software.
- Before changing existing files, inspect the relevant code and preserve user changes.
- If a command requires elevated permission, network access, or installation, explain why and request approval.

## Verification

- Run appropriate checks before reporting completion whenever practical.
- For app changes, prefer:
  - `npm run lint`
  - `npm run build`
- Check `git status` before and after meaningful changes.
- Do not commit generated folders like `node_modules` or `dist`.

## Git Workflow

- Keep work committed in logical milestones.
- Push successful commits to `origin/main` unless the user asks for a different branch workflow.
- Never use `git reset --hard`, force push, or discard user changes without confirmation.

## Code Preferences

- Follow the existing React + TypeScript + Vite structure.
- Keep source organized under `src/app`, `src/components`, `src/data`, `src/hooks`, `src/styles`, and `src/types`.
- Prefer typed data models and small focused components.
- Avoid unnecessary abstractions until they solve a real project problem.