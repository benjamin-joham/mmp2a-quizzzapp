import Header from './../components/header'
import Login from '../components/login'
import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define

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
