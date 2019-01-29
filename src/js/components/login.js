import { h } from 'jsx-dom'
import bem from 'bem-names'
import {userLogin, userLogout} from '../modules/firebase'

const Login = () => {
<<<<<<< HEAD
    return(
        <section className={bem('login')}>
        <button className={bem('button', ['login'])}
          onClick={(e) => {
            //console.log('login with google')
            userLogin()
          }}>Login with Google</button>
        <button className={bem('button',['login'])}
          onClick={(e) => {
            console.log('without login')
            userLogout()
          }}>Play without Login</button>
        </section>
    )
=======
  return (
    <section className={bem('login')}>
      <button className={bem('button', ['login'])}>Login with Google</button>
      <button className={bem('button', ['login'])}>Play without Login</button>
    </section>
  )
>>>>>>> feature/quiz_component
}

export default Login
