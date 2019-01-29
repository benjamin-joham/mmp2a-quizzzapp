import { h } from 'jsx-dom'
import bem from 'bem-names'

const Login = () => {
  return (
    <section className={bem('login')}>
      <button className={bem('button', ['login'])}>Login with Google</button>
      <button className={bem('button', ['login'])}>Play without Login</button>
    </section>
  )
}

export default Login
