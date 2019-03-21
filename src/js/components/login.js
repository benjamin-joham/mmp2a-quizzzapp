import bem from 'bem-names'
import { userLogin } from '../modules/firebase'
import router from '../modules/router'
import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define

const Login = () => {
  return (
    <section className={bem('login')}>
      <h2 className={bem('login', 'h2')}>Welcome to QuizzzApp!</h2>
      <button className={bem('login','button', ['google'])}
        onClick={
          async (e) => {
            let response = await userLogin()
            if (response) router.navigate('/start')
          }
        }>
        Login with Google
      </button>
      <button className={bem('login','button', ['anonym'])}
        onClick={
          (e) => {
            router.navigate('/start')
          }
        }>
        Play without Login
      </button>
    </section>
  )
}

export default Login
