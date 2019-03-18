import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import bem from 'bem-names'
import router from './../modules/router'
import { UpdateScoresOfSP, UpdateScoresOfChallenge, updateFirestore } from './../modules/firebase'

let score = []
console.log('initial scores: ', score)

const Quiz = ({ children, ...props }) => {
  let completeQuestion = window.questions
  let numberOfQuestions = Object.values(completeQuestion).length
  console.log(numberOfQuestions)
  let multiplayer = true ? props.multiplayer == 'true' : false
  let numberOfPlayers = props.amountPlayer
  let activePlayer = props.player
  let currentQuestion = props.question
  let question = decodeHTMLEntities(completeQuestion[currentQuestion - 1].question)
  let correctAnswerDecoded = decodeHTMLEntities(completeQuestion[currentQuestion - 1].correctAnswer)
  let arr = [
    correctAnswerDecoded,
    decodeHTMLEntities(completeQuestion[currentQuestion - 1].incorrectAnswers[0]),
    decodeHTMLEntities(completeQuestion[currentQuestion - 1].incorrectAnswers[1]),
    decodeHTMLEntities(completeQuestion[currentQuestion - 1].incorrectAnswers[2])
  ]
  let answer1 = 'A: ' + arr[0] // correct
  let answer2 = 'C: ' + arr[1]
  let answer3 = 'B: ' + arr[2]
  let answer4 = 'D: ' + arr[3]

  let rand = Math.floor((Math.random() * 3))
  answer1 = 'A: ' + arr[rand]
  switch (rand) {
    case 1:
      answer2 = 'C: ' + arr[0] // correct
      break
    case 2:
      answer3 = 'B: ' + arr[0]
      break
    case 3:
      answer4 = 'D: ' + arr[0]
      break
    default:
      break
  }
  console.log('active player', activePlayer)
  console.log('question', currentQuestion)

  const checkAnswer = (event) => {
    let buttonText = event.target.textContent
    let button = event.target
    buttonText = buttonText.substring(3, buttonText.length)

    let total = 0
    let correct = 1

    if (buttonText == correctAnswerDecoded) {
      let buttonID = button.id
      document.getElementById(buttonID).disabled = true
      let buttons = document.getElementsByTagName('button')
      document.querySelector('.question__h2').innerHTML = 'CORRECT'
      button.id = 'correct'
      for (let i = 0; i < 4; i++) {
        if (buttons[i].id != 'correct') buttons[i].style.visibility = 'hidden'
      }

      if (score[activePlayer - 1]) score[activePlayer - 1]++
      else {
        score[activePlayer - 1] = 1
      }
    } else {
      button.id = 'wrong'
      let buttons = document.getElementsByTagName('button')
      document.querySelector('.question__h2').innerHTML = 'WRONG'

      for (let i = 0; i < 4; i++) {
        let currenButton = buttons[i]
        let buttonID = currenButton.id
        document.getElementById(buttonID).disabled = true
        if (currenButton.textContent.substring(3, currenButton.textContent.length) == correctAnswerDecoded) { currenButton.id = 'correct' }
        if (currenButton.id != 'wrong' && currenButton.id != 'correct') { currenButton.style.visibility = 'hidden' }
      }
    }

    // TODO: check if all questions have been answered
    if (currentQuestion < numberOfQuestions || activePlayer < numberOfPlayers) {
      // TODO: check if all players had the question
      if (activePlayer < numberOfPlayers) {
        // console.log('Quiz-Player: ', numberOfPlayers)
        activePlayer++

        setTimeout(() => {
          console.log('next question')
          router.navigate('quiz?mulitplayer=' + multiplayer + '&amountPlayer=' + numberOfPlayers + '&question=' + currentQuestion + '&player=' + activePlayer)
        }, 1500)
      } else {
        console.log('new scores: ', score)
        activePlayer = 1
        console.log('next question')
        setTimeout(() => {
          currentQuestion++
          router.navigate('quiz?mulitplayer=' + multiplayer + '&amountPlayer=' + numberOfPlayers + '&question=' + currentQuestion + '&player=' + activePlayer)
          console.log('hieeeeeeer')
        }, 1500)
      }
    } else if (currentQuestion == numberOfQuestions) {
      if (score.length == numberOfPlayers) {
        localStorage.setItem('scores', JSON.stringify(score))
      } else {
        for (let i = 0; i < numberOfPlayers; i++) {
          if (score[i]) {
            continue
          } else {
            score[i] = 0
          }
        }
        localStorage.setItem('scores', JSON.stringify(score))
      }
      let scores = JSON.parse(localStorage.getItem('scores'))

      console.log('quizzz ende!!!!!')
      if (scores.length < 2) {
        // Update Scores in Firestore
        if (window.challenge == true) {
          setTimeout(() => {
            UpdateScoresOfChallenge(window.questionsId, window.challengeScore, score[0])
            updateFirestore()
            console.log('vor profiiiiiiil')
            router.navigate('/profile')
          }, 1000);
        } else {
          if(window.user) {
            UpdateScoresOfSP(window.user.email, numberOfQuestions, score[0])
            setTimeout(() => {
              console.log('vor endeeeeeee mit login')
              router.navigate('/end')
            }, 3000)
          }
          else {
            setTimeout(() => {
              console.log('vor endeeeeeee ohne login')
              router.navigate('/end')
            }, 3000)
          }
        }
      }
    }
  }

  const displayNumberOfQuestionAndPlayer = () => {
    let response = 'Question ' + currentQuestion
    if (multiplayer == false) {
      return response
    } else {
      return response + ' | Player' + activePlayer
    }
  }

  const displayChallenge = (props) => {
    let challenge
    if (props == true) {
      challenge = <h1 className={bem('quiz', 'h1', ['challenge'])} >Challenge</h1>
      return challenge
    }
    return challenge
  }

  function decodeHTMLEntities (text) {
    let entities = [
      ['amp', '&'],
      ['apos', '\''],
      ['#x27', '\''],
      ['#x2F', '/'],
      ['#39', '\''],
      ['#039', '\''],
      ['#47', '/'],
      ['lt', '<'],
      ['gt', '>'],
      ['nbsp', ' '],
      ['Uuml;', 'Ü'],
      ['Uuml', 'Ü'],
      ['uuml', 'ü'],
      ['uuml;', 'ü'],
      ['quot', '"'],
      ['eacute', 'é'],
      ['Eacute', 'É'],
      ['ntilde', 'ñ'],
      ['ntilde;', 'ñ'],
      ['Ntilde', 'ñ'],
      ['Ntilde;', 'ñ'],
      ['oslash', 'ø'],
      ['szlig', 'ß']
    ]

    for (let i = 0, max = entities.length; i < max; ++i) {
      text = text.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1])
    }
    return text
  }

  return (
    <section className={bem('quiz')}>
      {displayChallenge(props.challenge)}
      <article className={bem('question')}>
        <h2 role="alert" className={bem('question', 'h2')}>{ displayNumberOfQuestionAndPlayer() }</h2>
        <p className={bem('question', 'p')}>{question}</p>
      </article>
      <article className={bem('answers')}>
        <p className={bem('answers', 'p')}><button id='button1' className={bem('answers', 'button')} onClick={checkAnswer}>{answer1}</button>
          <button id='button2' className={bem('answers', 'button')} onClick={checkAnswer}>{answer2}</button></p>
        <p className={bem('answers', 'p')}><button id='button3' className={bem('answers', 'button')} onClick={checkAnswer}>{answer3}</button>
          <button id='button4' className={bem('answers', 'button')} onClick={checkAnswer}>{answer4}</button></p>
      </article>
    </section>
  )
}
export default Quiz
