import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import bem from 'bem-names'
import { userLogin } from '../modules/firebase'
import router from '../modules/router'

const End = () => {
  return (
    <section className={bem('login')}>
    <h1 className={bem('login','h1')}>You finished the Quiz!</h1>
    <h2 className={bem('login','h2')}> You answered 3/5 Questions correct.</h2>
      <button className={bem('button')}
        onClick={
          async (e) => {
          let response = await userLogin()
          if (response) router.navigate('/profile')
          }
        }>
        View statistic!
      </button>
      <button className={bem('button')}
        onClick={
          (e) => {
          router.navigate('/start')
          }
        }>
        Play again!
      </button>
    </section>
  )
}

export default End
