# Adams Development

A Astro site on [CMS Ace](https://github.com/sandboxSonny/ace-kit#readme), made with `npx @sandboxsonny/ace-kit create`. Its domain in the CMS is `adamsdevelopment.co.uk`.

## Start

`npm install`, then `npm run dev`. The dev server works on your own private copy of the site in CMS Ace, so nothing you try touches the live one. (`npx ace-kit login` signs you in again if you need to.)

## Commands

- `npm run dev` runs the site, syncing the section types in your code to the CMS.
- `npm run generate` writes TypeScript types for your content types (run it after changing them).
- `npm run check` runs Prettier, ESLint, the type check, the tests and a build.

## Sections

Each kind of page section is a component with a `*.schema.ts` file beside it saying what an editor can fill in. See [Sections](https://github.com/sandboxSonny/ace-kit/blob/main/docs/sections.md) in the Ace Kit docs.
