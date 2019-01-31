import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import bem from 'bem-names'
import RenderChart from './../modules/chart';
import router from './../modules/router';
import { allQuestionSets } from './../modules/firebase'
import * as React from 'jsx-dom'

const Profile = () => {
  let challenge= React.createRef()

  setTimeout(() => {
  let data = window.user
  console.log('DATA: ', window.user)
  console.log('DATA: ', window.user.answers_last_round[0,0])
  let correct_questions_last=data.answers_last_round[1]
  let wrong_questions_last=data.answers_last_round[0]-correct_questions_last  //TODO: number aus DB
  let correct_questions_total=data.answers_total[1]
  let wrong_questions_total=data.answers_total[0]-correct_questions_total
  console.log("wrongs: ",wrong_questions_total)
  console.log("corrects: ",correct_questions_total)

  // const ctx = document.querySelector('#chart_lastRound').id
  // const ctx2 = document.querySelector('#char_total').id
  const ctx = document.getElementById('chart_lastRound')
  const ctx2 = document.getElementById('chart_total')

  RenderChart([wrong_questions_last, correct_questions_last], ctx, ['wrong', 'correct'])

  RenderChart([wrong_questions_total, correct_questions_total], ctx2, ['wrong', 'correct'])

  setTimeout(() => {
    let challenges = allQuestionSets //TODO: challenges aus DB
    console.log('challenges: ', challenges)
    let number_of_challenges= challenges.length;

      let content = <ul className={bem('ul')}></ul>
      console.log('getcontent wird gerufen')
      console.log(number_of_challenges)
      challenges.map((x) => {
        let result
        if(x.done == false) {
          result = 'not yet played'
        }
        else {
          result = 'You won' ? x.points[0] > x.points[1] : 'You lost'
        }
        console.log('mapping: ', x)
        content.appendChild(
          <li className={bem('ul','li')}>
            {x.players[1]}
            <span>{result}</span>
          </li>
          )
      })
      // for(let i = 1; i <= number_of_challenges; i++)
      // {
      //     result = challenges[i-1]
      //     content.appendChild(<li className={bem('ul','li')}>{result}</li>)
      // }
    challenge.current.appendChild(content)

  }, 1000);
}, 500)

  return (
    <section id='profile' className={bem('profile')}>
      <a href='#' className={bem('profile','a', ['i'])} onClick={() => {
          event.preventDefault();
          router.navigate('/start')
          }}
          ><i class="fas fa-arrow-left"></i>
        </a>
        <h1 className={bem('profile', 'h1')}>Profile of {}</h1>
        <article className={bem('profile', 'article')}>
          <div className={bem('profile', 'div')}>
          <h2 className={bem('profile', 'h2')}>Last</h2>
            <canvas id="chart_lastRound" width="350" height="350"></canvas>
          </div>
          <div className={bem('profile', 'div')}>
          <h2 className={bem('profile', 'h2')}>Total</h2>
            <canvas id="chart_total" width="350" height="350"></canvas>
          </div>
          <div ref={challenge} className={bem('profile', 'div',['challenge'])}>
            <h2 className={bem('profile', 'h2')}>Challenges</h2>
          </div>
        </article>
    </section>
  )
}

export default Profile
