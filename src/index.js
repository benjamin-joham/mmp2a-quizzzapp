import './sass/style.scss'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import { h } from 'jsx-dom'
import Navigo from 'navigo'
import bem from 'bem-names'

// import firebase config
import { config as FirebaseConfig } from './js/firebase'

import your_class from './js/your_class'

firebase.initializeApp(FirebaseConfig)

// TODO: BEM test
console.log(bem('block', 'div', ['blue']))
// block__div block__div--blue

// TODO: routing test with navigo.js
const router = new Navigo(null)

// TODO: load data from open trivia api




// get content section
const content = document.getElementById('content')

const btnLogin = document.getElementById('btnLogin')
const btnLogout = document.getElementById('btnLogout')

let niceFunc = "Benjamin"
// $id = (i) => document.getElementById(i);

const h1 = (e, i) => {
  return <h1>{e}</h1>
}

router
  .on('/login', () => {
    content.innerHTML = ''
    // content.appendChild(h1("test"))
    //content.appendChild(h1)
    content.appendChild(h1('Bla'))
    content.appendChild(
      <ul>
        <li>
          <a id="btnLogin" href="#">
            Login
          </a>
        </li>
        <li>
          <a id="btnLogout" class="hide" href="#">
            Logout
          </a>
        </li>
      </ul>
    )
    btnLogin.onclick = e => {
      e.preventDefault()
      firebase.auth().signInAnonymously()
    }
  })
  .resolve()

router
  .on('/geil', () => {
    content.innerHTML = ''
    content.appendChild(<h1>Geile Seite</h1>)
  })
  .resolve()
// .resolve();
// Firebase.initializeApp(FirebaseConfig)
// var myFirebase = Firebase.database().ref()
// const table = myFirebase.child('users')

// table.push().set({
//   Denise: 'Hödl',
// })
// myFirebase.on(
//   'value',
//   function(snapshot) {
//     console.log(snapshot.val())
//   },
//   function(errorObject) {
//     console.log('The read failed: ' + errorObject.code)
//   },
// )
// console.log(table)

// If you have any questions just ask :)

const renderPage = path => {
  var button1 = document.createElement('button')
  button1.onclick = () => {
    router.navigate('/login') // like pushstate
  }
  var node1 = document.createTextNode('Login')
  button1.appendChild(node1)

  var button2 = document.createElement('button')
  button2.onclick = () => {
    router.navigate('/geil')
    // renderPage('/page2')
  }
  var node2 = document.createTextNode('Geil')
  button2.appendChild(node2)

  let var3 = document.createTextNode(path)

  const root = document.getElementById('root')
  root.innerHTML = ''
  const text = ['Hallo', 'Sepp']
  root.appendChild(
    <div>
      <span style={{ backgroundColor: 'red' }}>
        {text.map(k => (
          <li>{k}</li>
        ))}
      </span>
      h1
    </div>,
  )
  root.appendChild(button1)
  root.appendChild(button2)
  root.appendChild(var3)
}
renderPage(window.location.pathname)


router.notFound( (query) => {
  console.log(query);
})
