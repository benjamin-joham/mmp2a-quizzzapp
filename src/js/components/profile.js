import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import bem from 'bem-names'
import Chart from 'chart.js';
import router from '../modules/router';

const Profile = () => {
    let wrong_questions_last=1  //TODO: number aus DB
    let correct_questions_last=4
    let wrong_questions_total=9
    let correct_questions_total=55
    let challenges=['Thomas: You lost','Eva: You won', 'Magda: You won'] //TODO: challenges aus DB
    let number_of_challenges=challenges.length;
    let result='' 

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

  let getContent = () =>  {
    let content = <ul className={bem('ul')}></ul>
    for(let i = 1; i <= number_of_challenges; i++)
    {
        result = challenges[i-1]
        content.appendChild(<li className={bem('ul','li')}>{result}</li>)
    }
    return content
  }

  return (
    <section id='profile' className={bem('profile')}>
      <a href='#' className={bem('profile','a', ['i'])} onClick={() => {
          event.preventDefault();
          router.navigate('/start')
          }}
          ><i class="fas fa-arrow-left"></i></a>
        <h1 className={bem('profile', 'h1')}>Profile of {localStorage.getItem('user-name')}</h1>
        <article className={bem('profile', 'article')}>
        <div className={bem('profile', 'div')}>
          <canvas id="char_lastRound" width="350" height="350"></canvas>
        </div>
        <div className={bem('profile', 'div')}>
          <canvas id="chart_total" width="350" height="350"></canvas>
        </div>
        <div className={bem('profile', 'div',['challenge'])}>
        <h2 className={bem('profile', 'h2')}>Challenges</h2>
        {getContent()}
        </div>
      </article>
    </section>
  )
}

export default Profile
