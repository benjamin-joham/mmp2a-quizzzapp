import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import bem from 'bem-names'
import { userLogin } from '../modules/firebase'
import router from '../modules/router'

const Login = () => {
  return (
    <section className={bem('login')}>
      <button className={bem('button', ['login'])}
        onClick={
          async (e) => {
          let response = await userLogin()
          if (response) router.navigate('/start')
          }
        }>
        Login with Google
      </button>
      <button className={bem('button', ['login'])}
        onClick={
          (e) => {
          console.log('without login')
          router.navigate('/start')
          }
        }>
        Play without Login
      </button>
    </section>
  )
}

export default Login
