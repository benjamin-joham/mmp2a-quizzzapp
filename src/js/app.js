//import header from './partials/header'
import Login from './components/login'
import Impressum from './components/impressum'
// import login from './partials/login'

export default class app {
  constructor() {
  //this.login = Login
    this.login = new Login
    this.impressum = new Impressum
  }
  header() {
    //return this.test.renderLogin()
  }
  footer() {

  }
  firebase() {
    // this.login
  }
  landingpage(){
    console.log(login)
  }
}
