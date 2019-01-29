import Header from './../components/header'
import { h } from 'jsx-dom'
import Login from '../components/login';
import Settings from '../components/settings';
import api from './../modules/openTriviaApi'

const clickHandler = (event) => {

  event.preventDefault()
  console.log(event.target)
  let players = document.getElementById('btn_players_active')
  let questions = document.getElementById('btn_questions_active')

  console.log(players)
  console.log(questions)
  console.log('amount of players: ', players.value)
  console.log('amount of questions: ', questions.value)

  console.log(api(questions.value).then(x => console.log(x)))

}

const StartScreen = () => {

  return(
    <div id='root'>
      <Header />
      <main>
      <Settings />
      <div id='btn'>
        <button onClick={clickHandler}>Start</button>
      </div>
      </main>
    </div>
  )
}

export default StartScreen