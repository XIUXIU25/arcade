# Arcade

A SvelteKit app that brings my Project 1 crossword into a small arcade and adds 2048.

## Requirements

- Node.js 24 (see `.nvmrc`)
- npm

## Run locally

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. The home, about, contact, and crossword pages are migrated from Project 1. The `/2048` route uses the separately maintained `@xiuxiuy/arcade-core` package.

## Routes

- `/` — arcade home
- `/about` — about
- `/contact` — contact links
- `/crossword` — mini crossword
- `/2048` — 2048 game

## Deployment

The app is built with `@sveltejs/adapter-static` and deployed to GitHub Pages by the workflow in `.github/workflows/`, which runs on every push to `main`. The game logic is installed from the public npm registry as `@xiuxiuy/arcade-core`.
