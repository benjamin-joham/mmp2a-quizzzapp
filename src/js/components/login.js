import bem from 'bem-names'
import { userLogin } from '../modules/firebase'
import router from '../modules/router'

const Login = () => {
  return (
    <section className={bem('login')}>
      <h2 className={bem('login', 'h2')}>Welcome to QuizzzApp!</h2>
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
            router.navigate('/start')
          }
        }>
        Play without Login
      </button>
    </section>
  )
}

export default Login
