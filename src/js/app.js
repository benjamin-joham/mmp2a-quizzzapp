import { h } from 'jsx-dom'
import bem from 'bem-names'
import Impressum from './components/impressum'
import Login from './components/login'
import { Header } from './partials/header'


export default class app {
  constructor() {
  //this.login = Login
    // this.login = new Login
  }
  header(root) {
    root.appendChild(<Header/>)
    // if(window.user != null){
    //   root.appendChild(<a>Profile</a>)
    // }
    //return this.test.renderLogin()
  }
  footer() {

  }
  firebase() {
    // this.login
  }

  loginPage(root) {
    root.appendChild(<Login/>)
    // let google = document.getElementsByClassName('button--login')[0]
    // console.log(google)
    // google.addEventListener('click', (e) => {
    //   e.preventDefault()
    //   // firebase()
    //   console.log('login with google')
    // })
  }

  landingPage(root) {
    root.appendChild(<Login/>)

  }
  impressum(root) {
    root.appendChild(<Impressum/>)
  }
}
