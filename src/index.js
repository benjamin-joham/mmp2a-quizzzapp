import './sass/style.scss'

import { h } from 'jsx-dom'
import Navigo from 'navigo'
import bem from 'bem-names'
import '@babel/polyfill'

<<<<<<< HEAD
// // import classes

// pages
import Header from './js/components/header';
import LoginScreen from './js/partials/loginScreen';
import StartScreen from './js/partials/startScreen';

// TODO: Firebase start
// see firebase.js
// TODO: REVIEW: Firebase stop

window.location.hash = ''
const router = new Navigo(window.location.origin)
  // console.log(router)
// const router = new Navigo(window.location.origin)

// async function test() {

//   return await getUsers();
// }
// const testUser = test().then(x => console.log("test",x))


// import Header from './js/components/header';
// const trivia = new api

// async function apiCall() {
//   return await trivia.getData(5)
//   // await console.log(trivia_data)
// }
//const response = apiCall().then(x => console.log(x))

=======
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
>>>>>>> feature/quiz_component

// let quizz = new app
// console.log(quizz.landingpage())
// let header = quizz.landingpage()

<<<<<<< HEAD

// const quizz = new app
=======
const quizz = new app()
>>>>>>> feature/quiz_component

// console.log(quizz)

// console.log (quizz.header())
// console.log(quizz.login)

// console.log(quizz.firebase())

// // CORE CODE

// // TODO: BEM test
// console.log(bem('block', 'div', ['blue']))
// // block__div block__div--blue

// // TODO: routing test with navigo.js
<<<<<<< HEAD
const body = document.querySelector('body')
=======
const main = document.querySelector('main')
main.appendChild(quizz.quiz)
const body = main.parentElement
// console.log( 'body ist gleich')
// console.log(body)
// console.log(navigoRoot)
// const router = new Navigo(null, true, '#')
>>>>>>> feature/quiz_component

// console.log(window.location.pathname)

router.notFound(() => {
  main.innerHTML = ''
  main.appendChild(<h1>404 Page not found</h1>)
  console.log('404')
})

router
  .on(
<<<<<<< HEAD
  {
    '/': () => {
      console.log('jetzt in root')
      // append LoginScreen
      body.appendChild(<LoginScreen/>)
    },
    'start': () => {
      // append StartScreen
      body.appendChild(<StartScreen />)
    },
    'test': () => {
      body.appendChild(<Header data='quiz' value='1/5'/>)
      // body.innerHTML = 'Hi'
      // body.insertBefore(quizz.header(), main)
      // quizz.header(header)
      // console.log('jetzt in test')
      // main.innerHTML = ''
      // // main.appendChild(<h1>{window.user}</h1>)

      // main.appendChild(<h1>Test</h1>)
    }
  }).resolve()
=======
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
>>>>>>> feature/quiz_component
