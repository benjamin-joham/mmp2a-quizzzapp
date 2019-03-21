import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import bem from 'bem-names'
import RenderChart from './../modules/chart'
import router from './../modules/router'
import { allQuestionSets, updateFirestore } from './../modules/firebase'
import * as React from 'jsx-dom'

const Profile = () => {
  let challenge = React.createRef()

  setTimeout(async () => {
    let res = await updateFirestore()
    let data = window.user
    let correct_questions_last = data.answers_last_round[1]
    let wrong_questions_last = data.answers_last_round[0] - correct_questions_last
    let correct_questions_total = data.answers_total[1]
    let wrong_questions_total = data.answers_total[0] - correct_questions_total

    const ctx = document.getElementById('chart_lastRound')
    const ctx2 = document.getElementById('chart_total')

    RenderChart([wrong_questions_last, correct_questions_last], ctx, ['wrong', 'correct'])

    RenderChart([wrong_questions_total, correct_questions_total], ctx2, ['wrong', 'correct'])

    setTimeout(() => {
      let challenges = [] // TODO: challenges aus DB
      let id = []
      let result
      let rival
      let player_points
      let rival_points

      let number_of_challenges = allQuestionSets.data.length

      let content = <ul className={bem('ul')}></ul>

      allQuestionSets.data.map((x, i) => {
        const id = allQuestionSets.id[i]
        // check if Challenger is not current user
        if (x.players[0] == window.user.name) {
          rival = x.players[1]
          player_points = x.points[0]
          rival_points = x.points[1]
          // check if challenge is still false
          if (!x.done) {
            result = <p className={bem('challenge', 'result', ['pending'])}>pending ...</p>
          } else { // challenge is already done
            // check if player won
            if (player_points > rival_points) {
              result = <p className={bem('challenge', 'result', ['done'])}>WIN - {player_points}/{rival_points}</p>
            } else if (player_points < rival_points) {
              result = <p className={bem('challenge', 'result', ['done'])}>LOSS - {player_points}/{rival_points}</p>
            } else {
              result = <p className={bem('challenge', 'result', ['done'])}>DRAW - {player_points}/{rival_points}</p>
            }
          }
        } else {
          rival = x.players[0]
          player_points = x.points[1]
          rival_points = x.points[0]
          if (!x.done) {
            result = <p><a href='#' className={bem('challenge', 'result', ['challenge'])} onClick={(e) => {
              e.preventDefault()
              window.questions = x.q_a_total
              window.questionsId = id
              window.challenge = true
              window.challengeScore = x.points[0]
              router.navigate('/quiz?mulitplayer=false&amountPlayer=1&question=1&player=1')
            }}>Play Challenge</a></p>
          } else {
            // check if player won
            if (player_points > rival_points) {
              result = <p className={bem('challenge', 'result', ['done'])}>WIN - {player_points}/{rival_points}</p>
            } else if (player_points < rival_points) {
              result = <p className={bem('challenge', 'result', ['done'])}>Loss - {player_points}/{rival_points}</p>
            } else {
              result = <p className={bem('challenge', 'result', ['done'])}>Draw - {player_points}/{rival_points}</p>
            }
          }
        }
        // TODO: Show profile correct and route to correct challenge

        // append content
        content.appendChild(
          <li className={bem('ul', 'li')}>
            <h3>{rival}</h3>
            {result}
          </li>
        )
      })
      challenge.current.appendChild(content)
    }, 1000)
  }, 500)

  return (
    <section id='profile' className={bem('profile')}>
      <a href='#' className={bem('profile', 'a', ['i'])} onClick={() => {
        event.preventDefault()
        router.navigate('/start')
      }}
      ><i class="fas fa-arrow-left"></i>
      </a>
      <h1 className={bem('profile', 'h1')}>Profile of {window.user.name}</h1>
      <article className={bem('profile', 'article')}>
        <div className={bem('profile', 'div')}>
          <h2 className={bem('profile', 'h2')}>Last</h2>
          <canvas id="chart_lastRound" width="350" height="350"></canvas>
        </div>
        <div className={bem('profile', 'div')}>
          <h2 className={bem('profile', 'h2')}>Total</h2>
          <canvas id="chart_total" width="350" height="350"></canvas>
        </div>
        <div ref={challenge} className={bem('profile', 'div', ['challenge'])}>
          <h2 className={bem('profile', 'h2')}>Challenges</h2>
        </div>
      </article>
    </section>
  )
}

export default Profile
