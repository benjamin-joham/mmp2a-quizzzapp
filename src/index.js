import './sass/style.scss'
// import 'firebase/database'

import { h } from 'jsx-dom'
import Navigo from 'navigo'
import bem from 'bem-names'
import '@babel/polyfill'

// import firebase config
import { config as FirebaseConfig } from './js/firebase'

// TODO: Firebase start
import firebase from 'firebase/app'
import 'firebase/auth'
// const router = new Navigo(window.location.origin)

// // import classes
import app from './js/app'

// import data from open trivia api
import api from './js/openTriviaApi'
const config = {
  apiKey: 'AIzaSyCYwYxJ-Mmwz47-PpFXtdONtBjUUDR8-7E',
  authDomain: 'mmp2a-85c2b.firebaseapp.com',
  databaseURL: 'https://mmp2a-85c2b.firebaseio.com/',
  projectId: 'mmp2a-85c2b',
  storageBucket: 'mmp2a-85c2b.appspot.com',
  messagingSenderId: '519321050416'
}

firebase.initializeApp(config)
console.log(firebase)
firebase.auth().signInAnonymously().catch(function (error) {
  // Handle Errors here.
  var errorCode = error.code
  var errorMessage = error.message
})

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log(user)
    var isAnonymous = user.isAnonymous
    var uid = user.uid
    // ...
  } else {
    // User is signed out.
    // ...
  }
  // ...
})

// TODO: REVIEW: Firebase stop

const router = new Navigo(null, true, '#')
// import Header from './js/components/header';
const trivia = new api()

async function apiCall () {
  return await trivia.getData(5)
  // await console.log(trivia_data)
}
// const response = apiCall().then(x => console.log(x))

// let quizz = new app
// console.log(quizz.landingpage())
// let header = quizz.landingpage()

const quizz = new app()

// console.log(quizz)

// console.log (quizz.header())
// console.log(quizz.login)

// console.log(quizz.firebase())

// // CORE CODE

// // TODO: BEM test
// console.log(bem('block', 'div', ['blue']))
// // block__div block__div--blue

// // TODO: routing test with navigo.js
const main = document.querySelector('main')
main.appendChild(quizz.quiz)
const body = main.parentElement
// console.log( 'body ist gleich')
// console.log(body)
// console.log(navigoRoot)
// const router = new Navigo(null, true, '#')

// console.log(router)

router.notFound(() => {
  main.innerHTML = ''
  main.appendChild(<h1>404 Page not found</h1>)
  console.log('404')
})

router
  .on(
    {
      '/': () => {
        console.log('jetzt in root')
        main.innerHTML = ''
        // Landingpage.render(root);
        quizz.landingPage(main)
      },
      'test': () => {
      // body.innerHTML = ''
      // body.insertBefore(<Header />, main)
        console.log('jetzt in test')
        main.innerHTML = ''
        main.appendChild(<h1>Test</h1>)
      },
      'main': () => {
        console.log('jetzt in main')
        main.innerHTML = ''
        main.appendChild(<h1>Main</h1>)
      },
      'login': () => {
        main.innerHTML = ''
        console.log('jetzt in login')
        console.log(quizz)
        quizz.loginPage(main)
      },
      'impressum': () => {
        main.innerHTML = ''
        quizz.impressum(main)
      }
    }).resolve
