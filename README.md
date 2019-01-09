# MMP2A
> This repository is for the Multimedia Project in our MMT Bachelor study

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


### Assignment4
- create a Joker SPA 
  - without libraries or frameworks for routing and templating
- use the baboilerplate2
## check


The main page (‘/’) should have a button “Tell joke”
after pressing the button a joke from the  babossignment REST API (https://babossingment.firebaseapp.com/api/v1/jokes) should be displayed 
use your code from last assignment to disable showing a joke more than one time
if all jokes are told display a message that indicates that
## check

the main page should have an anchor link “Add joke”
pressing on it should take us to the creation page /create (without full reload!)
use the babossignment API to add a new joke
show adding indication and send us back to the main page when the joke is added to the REST API
add a back button to this page

the main page should have an anchor link “All jokes”
pressing on it should take us to the jokes page /jokes (without full reload!)
use the babossignment API to list all jokes and authors of them
add a back button to this page

use es6 modules and as much as possible the stuff we lerned
there should never occur a full page reload using the SPA
browser back and forward buttons should work
reloading the SPA on a page should render that page

- implement Page Not Found 404