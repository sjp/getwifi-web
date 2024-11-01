# getwifi.link

## CLI Commands

* `npm install`: Installs dependencies
* `npm run dev`: Run a development, HMR server
* `npm run build`: Production-ready build
* `npm run preview`: Run a production-like server
* `npm run lint`: Scans code for potential issues via linting
* `npm run typesafe-i18n`: Generates i18n code when translations are updated

## Features

* Dark mode
* Translations available for over 20 over the most common languages
* Downloading to SVG or PNG
* One-click printing for the QR code

## Tools and Libraries

This project is largely an experiment in trying out different tools and libraries.

However for the most part this is built using the following:

* [Preact](https://preactjs.com/)
* [Vite](https://vite.dev/)
* [Pico CSS](https://picocss.com/)
* [qrcode.react](https://github.com/zpao/qrcode.react)
* [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n)
* [Biome](https://biomejs.dev/)

The choice of many of these libraries was to minimise the bundle size as much as possible.

Additionally the application is pre-rendered for fast initial page loads.
