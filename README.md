# MMP2A
> This repository is for the Multimedia Project in our MMT Bachelor study

## Individual Strengths
* HTML & CSS
* Teamwork
* Usage of Boilerplate
* Fun in creating this App together

## Individal Weaknesses
* Limited JavaScript abilities

## Learning Goals
* Improve our JavaScript abilities
* Usage of API (Open Trivia DB for the questions + Google for Login)
* (Usage of Firebase)

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