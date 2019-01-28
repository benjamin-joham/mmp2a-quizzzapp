import header from './partials/header'
// import login from './partials/login'

export default class app {
  constructor() {
    this.test = new header
    // this.login = new login
  }
  header() {
    return this.test.renderLogin()
  }
  footer() {

  }
  firebase() {
    // this.login
  }
}
