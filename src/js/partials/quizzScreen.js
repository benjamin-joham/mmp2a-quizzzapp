import Header from '../components/header'
import Quiz from '../components/quiz'
import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define

const QuizzScreen = (params) => {
  let amountOfQuestions = window.questions.length
  let queryData = params.query.split('&')
  let multiplayer = queryData[0].split('=')[1]
  let player = queryData[1].split('=')[1]
  let question = queryData[2].split('=')[1]
  let activePlayer = queryData[3].split('=')[1]

  let quiz = () => {
    if (window.challenge) {
      amountOfQuestions = window.challenge.length
      return <Quiz challenge={true} multiplayer={multiplayer} amountPlayer={player} question={question} player={activePlayer}/>
    } else {
      return <Quiz challenge = {false} multiplayer={multiplayer} amountPlayer={player} question={question} player={activePlayer}/>
    }
  }

  let header = () => {
    if (window.challenge) {
      amountOfQuestions = Object.values(window.questions).length
      return <Header data='quiz' value={question + '/' + amountOfQuestions}/>
    } else {
      return <Header data='quiz' value={question + '/' + amountOfQuestions}/>
    }
  }

  return (
    <div id='root'>
      {header()}
      <main className={window.challenge == true ? 'quiz--challenge' : ''}>
        {quiz()}
      </main>
    </div>
  )
}
export default QuizzScreen
