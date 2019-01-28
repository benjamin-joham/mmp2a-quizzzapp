# Webpack for Webdevs
## A webpack 4 based setup

### Installation
* If you haven't already, install [npm](https://www.npmjs.com/).
* Clone this repository to your local machine.
* `npm install`

### How to use
* `npm start` starts a local server. If you change any of the files in `src/`, the browser will reflect the changes automatically ("autorefresh", "autoreload").
* `npm run build` builds a production bundle in `dist/`

### Features
* uses sass (supporting the scss-syntax), minifies and auto-prefixes your css for production
* auto-prefixing depending on your choice of browsers you want to support in `.browserslist.rc`
* uses hashes for the js/css-filenames to prevent caching problems
* autorefreshes browsers (autoreloads)
* concatenates and minifies your js-files using webpack's intelligent dependency graph
* ES6 support via babel out of the box
* creates all the files needed for production in the build directory
* minifies images (jpg, png, jpg, svg)
* includes various icon references for touch devices

## Potentielle Packages/Libraries/APIs
* [ESLint](https://eslint.org/docs/rules/#stylistic-issues)
* [bem-names](https://www.npmjs.com/package/bem-names) naming generator for BEM
* [git-flow](https://github.com/nvie/gitflow/wiki/Mac-OS-X) for better git usage
* [open-trivia-api](https://opentdb.com/) for the questions and answers
* [chart.js](https://www.chartjs.org/docs/latest/) to display our charts in an easy way
* [navigo.js](https://github.com/krasimir/navigo) for routing
* [firebase](https://www.npmjs.com/package/firebase) for database access and authentication with either google or anonymously
* [jsx-dom](https://www.npmjs.com/package/jsx-dom) to write html in js
