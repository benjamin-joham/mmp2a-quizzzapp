import { h } from 'jsx-dom'
import bem from 'bem-names'
import Chart from 'chart.js';

const Profile = () => {

    let wrong_questions_last=1
    let correct_questions_last=4
    let wrong_questions_total=9
    let correct_questions_total=55
    setTimeout(() => {
    let ctx = document.getElementById("char_lastRound");
    Chart.defaults.global.defaultFontColor = 'white';
    Chart.defaults.global.legend.position='right';
    let myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: ["Wrong last", "Correct last"],
          datasets: [{
              label: '# of Questions',
              data: [wrong_questions_last, correct_questions_last],
              backgroundColor: [
                  'rgba(210, 0, 25, 1)',
                  'rgba(0, 190, 25, 1)'
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
                      beginAtZero:true,
                      display:false
                  }
              }]
          }
      }
  });
  let ctx2 = document.getElementById("chart_total");
  let myPieChart2 = new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: ["Wrong total", "Correct total"],
        datasets: [{
            label: '# of Questions',
            data: [wrong_questions_total, correct_questions_total],
            backgroundColor: [
                'rgba(210, 0, 25, 1)',
                'rgba(0, 190, 25, 1)'
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
                    beginAtZero:true,
                    display:false
                }
            }]
        }
    }
});
  }, 2)
  

  return (
    <section className={bem('profile')}>
      <article className={bem('profile', 'article')}>
        <h1 className={bem('profile', 'h1')}>Profile of Max Mustermann</h1>
        <div className={bem('profile', 'div')}>
          
          <canvas id="char_lastRound" width="400" height="400"></canvas>
        </div>
        <div className={bem('profile', 'div')}>
          
          <canvas id="chart_total" width="400" height="400"></canvas>
        </div>
      </article>
      <a className={bem('profile__a')} href="#"><i class="fas fa-arrow-left"></i></a>
    </section>
  )
}

export default Profile
