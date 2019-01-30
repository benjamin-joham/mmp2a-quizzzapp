import { h } from 'jsx-dom'
import bem from 'bem-names'

const Profile = () => {
  let wrong_questions_last=1
  let correct_questions_last=4
  let ctx = document.getElementById("myChart").getContext('2d');
  let myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["Wrong", "Correct"],
          datasets: [{
              label: '# of Questions',
              data: [wrong_questions_last, correct_questions_last],
              backgroundColor: [
                  'rgba(210, 0, 25, 0.2)',
                  'rgba(0, 190, 25, 0.2)'
              ],
              borderColor: [
                  'rgba(255,255,255,1)',
                  'rgba(255, 255, 255, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });


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
