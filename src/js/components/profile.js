import { h } from 'jsx-dom'
import bem from 'bem-names'

const Profile = () => {

<h1>hallo!!!</h1>



  return (
    <section className={bem('profile')}>
      <article className={bem('profile', 'article')}>
        <h1 className={bem('profile', 'h1')}>Profile of Max Mustermann</h1>
        <div className={bem('profile', 'div')}>
          <p className={bem('profile', 'p')}>hier könnte Ihre Statistik stehen</p>
          <canvas id="myChart" width="400" height="400"></canvas>
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
