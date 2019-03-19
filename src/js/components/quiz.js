import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import bem from 'bem-names'
import router from './../modules/router'
import decodeHTMLEntities from './../modules/decoder'
import mixAnswers from './../modules/questionMixer'
import { UpdateScoresOfSP, UpdateScoresOfChallenge, updateFirestore } from './../modules/firebase'

let score = []

const Quiz = ({ children, ...props }) => {
  let completeQuestion = window.questions
  let numberOfQuestions = Object.values(completeQuestion).length
  let multiplayer = true ? props.multiplayer == 'true' : false
  let numberOfPlayers = props.amountPlayer
  let activePlayer = props.player
  let currentQuestion = props.question
  let question = decodeHTMLEntities(completeQuestion[currentQuestion - 1].question)
  let answersArray = [
    decodeHTMLEntities(completeQuestion[currentQuestion - 1].correct_answer),
    decodeHTMLEntities(completeQuestion[currentQuestion - 1].incorrect_answers[0]),
    decodeHTMLEntities(completeQuestion[currentQuestion - 1].incorrect_answers[1]),
    decodeHTMLEntities(completeQuestion[currentQuestion - 1].incorrect_answers[2])
  ]
  answersArray = mixAnswers(answersArray)

  const checkAnswer = (event) => {
    let buttonText = event.target.textContent
    buttonText = buttonText.substring(3, buttonText.length)
    let button = event.target
    let buttons = document.getElementsByTagName('button')
    let correctAnswer=decodeHTMLEntities(completeQuestion[currentQuestion - 1].correct_answer)
    let buttonID = button.id
    document.getElementById(buttonID).disabled = true

    if (buttonText == correctAnswer) {
      button.id = 'correct'
      document.querySelector('.question__h2').innerHTML = 'CORRECT'
      score[activePlayer - 1] ? score[activePlayer - 1]++ : score[activePlayer - 1] = 1
    } else {
      button.id = 'wrong'
      document.querySelector('.question__h2').innerHTML = 'WRONG'
    }

    for (let i = 0; i < 4; i++) {
      let currenButton = buttons[i]
      let buttonID = currenButton.id
      document.getElementById(buttonID).disabled = true
      if (currenButton.textContent.substring(3, currenButton.textContent.length) == correctAnswer) { currenButton.id = 'correct' }
      if (currenButton.id != 'wrong' && currenButton.id != 'correct') { currenButton.style.visibility = 'hidden' }
    }

    currentQuestion < numberOfQuestions || activePlayer < numberOfPlayers ? displayNextQuestion() : endGame()
  }

  const displayNextQuestion = function(){
    activePlayer < numberOfPlayers ? activePlayer++ : (activePlayer = 1, currentQuestion++)
      setTimeout(() => {
        router.navigate('quiz?mulitplayer=' + multiplayer + '&amountPlayer=' + numberOfPlayers + '&question=' + currentQuestion + '&player=' + activePlayer)
      }, 1500)
  }

  const endGame =() =>{
    if(score.length!=numberOfPlayers) {
      for (let i = 0; i < numberOfPlayers; i++) {
        score[i] ? score[i]=score[i] : score[i]=0
      }
    }
    localStorage.setItem('scores', JSON.stringify(score))
    let scores = JSON.parse(localStorage.getItem('scores'))
    window.challenge==true ? sendUserToProfile() : sendUserToEndScreen()
  }

  const sendUserToEndScreen = () => {
    if(window.user) {
      UpdateScoresOfSP(window.user.email, numberOfQuestions, score[0])
    }
    setTimeout(() => {
      router.navigate('/end')
    }, 3000)
  }

  const sendUserToProfile = () => {
            setTimeout(() => {
            UpdateScoresOfChallenge(window.questionsId, window.challengeScore, score[0])
            updateFirestore()
            router.navigate('/profile')
          }, 1000);
  }

  const displayNumberOfQuestionAndPlayer = () => {
    let response = 'Question ' + currentQuestion
      if (multiplayer == true) {
      response += ' | Player' + activePlayer
    }
      return response
  }

  const displayChallenge = (props) => {
    let challenge
    if (props == true) {
      challenge = <h1 className={bem('quiz', 'h1', ['challenge'])} >Challenge</h1>
    }
    return challenge
  }

  return (
    <section className={bem('quiz')}>
      {displayChallenge(props.challenge)}
      <article className={bem('question')}>
        <h2 role="alert" className={bem('question', 'h2')}>{ displayNumberOfQuestionAndPlayer() }</h2>
        <p className={bem('question', 'p')}>{question}</p>
      </article>
      <article className={bem('answers')}>
        <p className={bem('answers', 'p')}><button id='button1' className={bem('answers', 'button')} onClick={checkAnswer}>{answersArray[0]}</button>
          <button id='button2' className={bem('answers', 'button')} onClick={checkAnswer}>{answersArray[1]}</button></p>
        <p className={bem('answers', 'p')}><button id='button3' className={bem('answers', 'button')} onClick={checkAnswer}>{answersArray[2]}</button>
          <button id='button4' className={bem('answers', 'button')} onClick={checkAnswer}>{answersArray[3]}</button></p>
      </article>
    </section>
  )
}
export default Quiz