import { h } from 'jsx-dom'
import bem from 'bem-names'
import Impressum from './components/impressum'
import Login from './components/login'
<<<<<<< HEAD
import { Header } from './partials/header'

=======
import Quiz from './components/quiz'
>>>>>>> feature/quiz_component

export default class app {
  constructor () {
  // this.login = Login
    // this.login = new Login
    this.quiz = new Quiz()
  }
<<<<<<< HEAD
  header(root) {
    root.appendChild(<Header/>)
    // if(window.user != null){
    //   root.appendChild(<a>Profile</a>)
    // }
    //return this.test.renderLogin()
=======
  header () {
    // return this.test.renderLogin()
>>>>>>> feature/quiz_component
  }
  footer () {

  }
  firebase () {
    // this.login
  }

  loginPage (root) {
    root.appendChild(<Login/>)
    // let google = document.getElementsByClassName('button--login')[0]
    // console.log(google)
    // google.addEventListener('click', (e) => {
    //   e.preventDefault()
    //   // firebase()
    //   console.log('login with google')
    // })
  }

<<<<<<< HEAD
  landingPage(root) {
    root.appendChild(<Login/>)

=======
  landingPage (root) {
    root.appendChild(<h1>Root</h1>)
>>>>>>> feature/quiz_component
  }
  impressum (root) {
    root.appendChild(<Impressum/>)
  }
}
