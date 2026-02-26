# fivem-typescript-boilerplate

A boilerplate for creating FiveM resources with TypeScript.

## Getting Started

### Node.js v18+

Install any LTS release of [`Node.js`](https://nodejs.org/) from v18.

### bun

Install the [`bun`](https://bun.com) javascript runtime.

## Development

Use `bun install` to install all packages

Use `bun watch` to actively rebuild modified files while developing the resource.

During web development, use `bun web:dev` to start vite's webserver and watch for changes.

## Build

Use `bun build` to build all project files in production mode.

To build and create GitHub releases, tag your commit (e.g. `v1.0.0`) and push it.

## Layout

- [/dist/](dist)
  - Compiled project files.
- [/locales/](locales)
  - JSON files used for translations with [ox_lib](https://overextended.dev/ox_lib/Modules/Locale/Shared).
- [/scripts/](scripts)
  - Scripts used in the development process, but not part of the compiled resource.
- [/src/](src)
  - Project source code.
- [/static/](static)
  - Files to include with the resource that aren't compiled or loaded (e.g. config).
