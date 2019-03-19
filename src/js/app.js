import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import Impressum from './components/impressum'
import Login from './components/login'
import { Header } from './partials/header'

export default class app {
  constructor () {
    this.quiz = new Quiz()
  }
  header (root) {
    root.appendChild(<Header/>)
  }
  footer () {
  }
  firebase () {
  }

  loginPage (root) {
    root.appendChild(<Login/>)
  }

  landingPage (root) {
    root.appendChild(<Login/>)
  }
  impressum (root) {
    root.appendChild(<Impressum/>)
  }

  profilePage (root) {
    root.appendChild(<Profile/>)
  }
}
