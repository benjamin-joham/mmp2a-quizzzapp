import { h } from 'jsx-dom'
import bem from 'bem-names'

const Profile = () => {
  return (
    <section className={bem('profile')}>
      <article className={bem('profile', 'article')}>
        <h1 className={bem('profile', 'h1')}>Profile of Max Mustermann</h1>
        <div className={bem('profile', 'div')}>
          <p className={bem('profile', 'p')}>hier könnte Ihre Statistik stehen</p>
        </div>
        <div className={bem('profile', 'div')}>
          <p className={bem('profile', 'p')}>hier könnte Ihre Statistik stehen</p>
        </div>
      </article>
      <a className={bem('profile__a')} href="#"><i class="fas fa-arrow-left"></i></a>
    </section>
  )
}

export default Profile
