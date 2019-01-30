import Header from './../components/header'
import { h } from 'jsx-dom'
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
