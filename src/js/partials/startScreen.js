import Header from './../components/header'
import Settings from '../components/settings'
import api from './../modules/openTriviaApi'
import router from '../modules/router'

const clickHandler = async (event) => {
  event.preventDefault()
  let players = document.getElementById('btn_players_active')
  let questions = document.getElementById('btn_questions_active')

  console.log(api(questions.value)  //wtf?!?
    .then(x => {
      window.questions = x
    })
    .then(() => {
      localStorage.clear()
      if (players.value > 1) { router.navigate('/quiz?mulitplayer=true&amountPlayer=' + players.value + '&question=1&player=1') } else { router.navigate('/quiz?mulitplayer=false&amountPlayer=' + players.value + '&question=1&player=1') }
    })
  )
}

const StartScreen = () => {
  return (
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