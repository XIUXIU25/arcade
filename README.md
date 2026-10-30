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

Open the local URL printed by Vite. The home, about, contact, and crossword pages are migrated from Project 1. The `/2048` route is a placeholder while the game and its separately published `arcade-core` package are being built.

## Routes

- `/` — arcade home
- `/about` — about
- `/contact` — contact links
- `/crossword` — mini crossword
- `/2048` — game page (in progress)

## Deployment

The app is intended for GitHub Pages. The static adapter and Pages workflow will be configured as part of deployment setup.
