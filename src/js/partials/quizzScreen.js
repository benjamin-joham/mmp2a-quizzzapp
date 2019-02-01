import Header from '../components/header'
import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import Quiz from '../components/quiz'

const QuizzScreen = (params) => {
  let amountOfQuestions = window.questions.length
  // console.log(amountOfQuestions)
  // console.log('params: ',params)

  // console.log('query: ',query)
  let queryData = params.query.split('&')
  // console.log(queryData)

  let multiplayer = queryData[0].split('=')[1]
  // console.log('mulitplayer: ', multiplayer)
  let player = queryData[1].split('=')[1]
  // console.log('player: ', player)
  let question = queryData[2].split('=')[1]
  // console.log('question: ', question)

  let activePlayer = queryData[3].split('=')[1]

  // if(queryData.length > )
  // console.log('ActivePlayer: ', activePlayer)

  // console.log(queryData[0])
  let quiz = () => {
    if(window.challenge) {
      amountOfQuestions = window.challenge.length
      return <Quiz challenge={true} multiplayer={multiplayer} amountPlayer={player} question={question} player={activePlayer}/>
    }
    else {
      return <Quiz challenge = {false} multiplayer={multiplayer} amountPlayer={player} question={question} player={activePlayer}/>
    }
  }

  let header = () => {
    if(window.challenge) {
      amountOfQuestions = Object.values(window.questions).length
      console.log(window.questions.length)
      return <Header data='quiz' value={question + '/' + amountOfQuestions}/>
    }
    else {
      return <Header data='quiz' value={question + '/' + amountOfQuestions}/>
    }
  }

  // console.log(window.challenge)

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
