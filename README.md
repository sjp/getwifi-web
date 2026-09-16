# getwifi.link

## CLI Commands

- `npm ci`: Installs dependencies
- `npm run dev`: Run a development, HMR server
- `npm run build`: Production-ready build
- `npm run preview`: Run a production-like server
- `npm run check`: Format-check, lint, and type-check the code
- `npm run format`: Apply formatting
- `npm test`: Run the test suite
- `npm run typesafe-i18n`: Generates i18n code when translations are updated

## Features

- Dark mode
- Translations available for 20 of the most common languages
- Downloading to SVG or PNG
- One-click printing for the QR code

## Tools and Libraries

This project is largely an experiment in trying out different tools and libraries.

However for the most part this is built using the following:

- [Preact](https://preactjs.com/)
- [Vite](https://vite.dev/) (dev server and build)
- [Oxlint and Oxfmt](https://oxc.rs/) (linting and formatting)
- [Vitest](https://vitest.dev/) (tests)
- [Pico CSS](https://picocss.com/)
- [qrcode.react](https://github.com/zpao/qrcode.react)
- [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n)

The choice of many of these libraries was to minimise the bundle size as much as possible.

Additionally the application is pre-rendered for fast initial page loads.
