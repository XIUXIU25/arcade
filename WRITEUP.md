# Project 2 writeup

Review the bracketed prompts and replace them with your own details before handing this in.

## What went into the package and what stayed in the app

The `@xiuxiuy/arcade-core` package contains the 2048 board rules: moving and merging tiles, spawning a tile, and checking whether a move is legal or the game has ended. The app handles rendering, keyboard and mobile controls, score display, high score, save data, and win or game-over messages. I kept score tracking in the app because the updated assignment replaced the package's `score` function with `canMove`.

## Migrating Project 1 to Svelte

Moving the crossword into Svelte let me reuse the navigation and footer and split the puzzle into smaller components. Svelte state makes the letter inputs and solution reveal interactive while the callback props keep the page in control of progress. Keeping the old HTML and CSS would have been simpler for a small static crossword, but it would not have demonstrated the Svelte requirements or fit the new arcade and 2048 game as one app.

## Keeping the app and package in sync

I can publish changes to `arcade-core` with semantic versions and document each release in its changelog. The app should depend on a released version from npm and keep that exact resolution in `package-lock.json`, so a fresh install uses the same package version. Before publishing a breaking change, I can update the package version deliberately and confirm the app still works with the new release.

## Learning Svelte

During this project I used `$state`, `$derived`, `$props`, keyed each blocks, callback props, and scoped styles. The concept I found most challenging was **[describe the Svelte idea that took the most work]**. I feel **[say whether you feel comfortable or are still learning]** with Svelte, and **[describe one way it helped or slowed down your work]**.

## What I would add with more time

I would add swipe controls for mobile and a seed field so a game can be replayed with the same sequence of spawns. I would also expand the crossword with more puzzles and more helpful progress feedback. Finally, I would spend more time checking the contrast and layout across different screen sizes.

## Time spent

I spent about 8 hours

## Assumptions

I treated an empty square as `0` in the package's board representation. I used the standard 2048 spawn odds of 90% for a `2` and 10% for a `4`, and a new game begins with two tiles. I treated a legal move as one that changes the board; only then does the app spawn a new tile.

## Sources and outside help

I reused the pages, design, crossword content, and images from my Project 1. My Project 1 writeup credits `minicrossword.us.com` as a reference for the crossword idea and layout, and notes AI help with some site text and clue wording. For Project 2, I used **Codex (OpenAI)** to help scaffold and implement the SvelteKit migration, package logic, and game interface; I reviewed and adapted the generated code as part of the project. I also used the official SvelteKit documentation for static deployment setup.
