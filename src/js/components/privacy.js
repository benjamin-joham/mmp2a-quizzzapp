import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import bem from 'bem-names'

const Privacy = () => {
  return (
    <section id='privacy'className={bem('privacy')}>
      <h1 className={bem('h1')}>Privacy Declaration</h1>
      <p className={bem('p')}>We save your Google-login data to ensure you the ability to login from every device with internet connection.</p>
      <p className={bem('p')}>Further we safe the amount of questions you answered, including the number of correct answered questions.</p>
      <p className={bem('p')}>We do not sell you data to anyone, we just want you to have a good time playing QuizzzApp!</p>
      <a href='#profile' className={bem('privacy', 'a', ['i'])}><i class="fas fa-arrow-up"></i></a>
    </section>
  )
}
export default Privacy
