import {h} from 'jsx-dom'
import bem from 'bem-names'
import {userLogin, userLogout} from '../modules/firebase'

const Login = () => {
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
}

export default Login
