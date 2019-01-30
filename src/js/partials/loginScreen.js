import Header from './../components/header'
import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import Login from '../components/login'

const LoginScreen = () => {
  return (
    <div id='root'>
      <Header/>
      <main>
        <Login/>
      </main>
    </div>
  )
}

export default LoginScreen
