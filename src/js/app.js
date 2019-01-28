import { h } from 'jsx-dom'
import bem from 'bem-names'
// import header from './partials/header'
import Login from './components/login'
// import login from './partials/login'



export default class app {
  constructor() {
  //this.login = Login
    // this.login = new Login
  }
  header() {
    //return this.test.renderLogin()
  }
  footer() {

  }
  firebase() {
    // this.login
  }

  loginPage(root) {
    root.appendChild(<Login/>)
    let google = document.getElementsByClassName('button--login')[0]
    console.log(google)
    google.addEventListener('click', (e) => {
      e.preventDefault()
      firebase()
      console.log('login with google')
    })
  }

  landingPage(root) {
    root.appendChild(<h1>Root</h1>)

  }
}
