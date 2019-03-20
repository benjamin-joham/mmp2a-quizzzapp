import bem from 'bem-names'
import router from './../modules/router'
import { UpdateScoresOfSP, UpdateScoresOfChallenge, updateFirestore } from './../modules/firebase'

let score = []
console.log('initial scores: ', score)

const Quiz = ({ children, ...props }) => {
  let question_and_answers = window.questions
  let number_of_questions = Object.values(question_and_answers).length
  console.log(number_of_questions)
  let multiplayer = true ? props.multiplayer == 'true' : false
  let number_of_players = props.amountPlayer
  let activePlayer = props.player
  let current_question = props.question
  let question = decodeHTMLEntities(question_and_answers[current_question - 1].question)
  let correct_ans = decodeHTMLEntities(question_and_answers[current_question - 1].correct_answer)
  let arr = [
    correct_ans,
    decodeHTMLEntities(question_and_answers[current_question - 1].incorrect_answers[0]),
    decodeHTMLEntities(question_and_answers[current_question - 1].incorrect_answers[1]),
    decodeHTMLEntities(question_and_answers[current_question - 1].incorrect_answers[2])
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
  console.log('question', current_question)

  const checkAnswer = (event) => {
    let button_text = event.target.textContent
    let button = event.target
    button_text = button_text.substring(3, button_text.length)

    let total = 0
    let correct = 1

    if (button_text == correct_ans) {
      let button_id = button.id
      document.getElementById(button_id).disabled = true
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
        let current_button = buttons[i]
        let button_id = current_button.id
        document.getElementById(button_id).disabled = true
        if (current_button.textContent.substring(3, current_button.textContent.length) == correct_ans) { current_button.id = 'correct' }
        if (current_button.id != 'wrong' && current_button.id != 'correct') { current_button.style.visibility = 'hidden' }
      }
    }

    // TODO: check if all questions have been answered
    if (current_question < number_of_questions || activePlayer < number_of_players) {
      // TODO: check if all players had the question
      if (activePlayer < number_of_players) {
        // console.log('Quiz-Player: ', number_of_players)
        activePlayer++

        setTimeout(() => {
          console.log('next question')
          router.navigate('quiz?mulitplayer=' + multiplayer + '&amountPlayer=' + number_of_players + '&question=' + current_question + '&player=' + activePlayer)
        }, 1500)
      } else {
        console.log('new scores: ', score)
        activePlayer = 1
        console.log('next question')
        setTimeout(() => {
          current_question++
          router.navigate('quiz?mulitplayer=' + multiplayer + '&amountPlayer=' + number_of_players + '&question=' + current_question + '&player=' + activePlayer)
          console.log('hieeeeeeer')
        }, 1500)
      }
    } else if (current_question == number_of_questions) {
      if (score.length == number_of_players) {
        localStorage.setItem('scores', JSON.stringify(score))
      } else {
        for (let i = 0; i < number_of_players; i++) {
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
            UpdateScoresOfSP(window.user.email, number_of_questions, score[0])
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
            // router.navigate('/end')
          }
        }
      }
      // if (window.challenge) {
      //   setTimeout(() => {
      //     console.log('vor profiiiiiiil')
      //     router.navigate('/profile')
      //   }, 1000)
      // } else {
      //   setTimeout(() => {
      //     console.log('vor endeeeeeee')
      //     router.navigate('/end')
      //   }, 3000)
      // }
    }
  }

  // if()

  const displayNumberOfQuestionAndPlayer = () => {
    let response = 'Question ' + current_question
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

  // answer1=decodeHTMLEntities(answer1);
  // answer2=decodeHTMLEntities(answer2);
  // answer3=decodeHTMLEntities(answer3);
  // answer4=decodeHTMLEntities(answer4);
  // question=decodeHTMLEntities(question);
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
