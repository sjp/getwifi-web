# getwifi.link

## CLI Commands

This project uses [Vite+](https://viteplus.dev/) as its unified toolchain, driven by the `vp` CLI.

- `vp install`: Installs dependencies
- `vp dev`: Run a development, HMR server
- `vp build`: Production-ready build
- `vp preview`: Run a production-like server
- `vp check`: Format, lint, and type-check the code
- `vp test`: Run the test suite
- `vp run typesafe-i18n`: Generates i18n code when translations are updated

## Features

- Dark mode
- Translations available for 20 of the most common languages
- Downloading to SVG or PNG
- One-click printing for the QR code

## Tools and Libraries

This project is largely an experiment in trying out different tools and libraries.

However for the most part this is built using the following:

- [Preact](https://preactjs.com/)
- [Vite+](https://viteplus.dev/) (build, lint, format, and test tooling, built on Vite, Oxlint, and Oxfmt)
- [Pico CSS](https://picocss.com/)
- [qrcode.react](https://github.com/zpao/qrcode.react)
- [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n)

The choice of many of these libraries was to minimise the bundle size as much as possible.

Additionally the application is pre-rendered for fast initial page loads.
