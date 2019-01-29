import './sass/style.scss'

import { h } from 'jsx-dom'
import Navigo from 'navigo'
import bem from 'bem-names'
import '@babel/polyfill'

// // import classes

// pages
import Header from './js/components/header';
import LoginScreen from './js/partials/loginScreen';

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


// let quizz = new app
// console.log(quizz.landingpage())
// let header = quizz.landingpage()


// const quizz = new app

// console.log(quizz)

// console.log (quizz.header())
// console.log(quizz.login)

// console.log(quizz.firebase())

// // CORE CODE


// // TODO: BEM test
// console.log(bem('block', 'div', ['blue']))
// // block__div block__div--blue

// // TODO: routing test with navigo.js
const root = document.querySelector('body')

// console.log(window.location.pathname)

router.notFound( () => {
  main.innerHTML = ''
  main.appendChild(<h1>404 Page not found</h1>)
  console.log('404')
})

router
  .on(
  {
    '/': () => {
      // console.log(window.location)
      console.log('jetzt in root')
      // append LoginScreen
      root.appendChild(<LoginScreen/>)
      // main.innerHTML = ''
      // Landingpage.render(root);
      // quizz.landingPage(main)
    },
    'start': () => {
      // append StartScreen
      // root.appendChild()
    },
    'test': () => {
      root.appendChild(<Header data='quiz' value='1/5'/>)
      // body.innerHTML = 'Hi'
      // body.insertBefore(quizz.header(), main)
      // quizz.header(header)
      // console.log('jetzt in test')
      // main.innerHTML = ''
      // // main.appendChild(<h1>{window.user}</h1>)

      // main.appendChild(<h1>Test</h1>)
    },
    'main': () => {
      console.log('jetzt in main')
      main.innerHTML = ''
      main.appendChild(<h1>Main</h1>)
    },
    'login': () => {
      main.innerHTML = ''
      console.log('jetzt in login')
      // console.log(quizz)
      // quizz.loginPage(main)
    },
    'impressum': () => {
      main.innerHTML = ''
      // quizz.impressum(main)
    }
  }).resolve()
