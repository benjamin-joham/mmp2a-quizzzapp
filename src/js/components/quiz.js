import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import bem from 'bem-names'
import router from '../modules/router'

let score = []
console.log('initial scores: ', score)

const Quiz = ({ children, ...props }) => {
  let question_and_answers = JSON.parse(localStorage.getItem('questions'))
  let number_of_questions = question_and_answers.length
  let multiplayer = true ? props.multiplayer == 'true' : false
  let number_of_players = props.amountPlayer
  // scores.length = number_of_players
  let activePlayer = props.player
  let current_question = props.question
  // console.log('Quiz props: ',props)
  // console.log(question_and_answers)
  // console.log('mulitplayer in quiz: ', multiplayer)


  let arr = [
    question_and_answers[current_question - 1].correct_answer,
    question_and_answers[current_question - 1].incorrect_answers[0],
    question_and_answers[current_question - 1].incorrect_answers[1],
    question_and_answers[current_question - 1].incorrect_answers[2]
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

  const checkAnswer = (event) => {
    let button_text = event.target.textContent
    let button = event.target
    button_text = button_text.substring(3, button_text.length)

    if (button_text == question_and_answers[current_question - 1].correct_answer) {
      let buttons = document.getElementsByTagName('button')
      document.querySelector('.question__h2').innerHTML = 'CORRECT'
      button.id = 'correct'
      for (let i = 0; i < 4; i++) {
        if (buttons[i].id != 'correct') buttons[i].style.visibility = 'hidden'
      }
      if (score[activePlayer-1]) score[activePlayer-1]++
      else score[activePlayer-1] = 1

    } else {
      button.id = 'wrong'
      let buttons = document.getElementsByTagName('button')
      document.querySelector('.question__h2').innerHTML = 'WRONG'

      for (let i = 0; i < 4; i++) {
        let current_button = buttons[i]
        if (current_button.textContent.substring(3, current_button.textContent.length) == question_and_answers[current_question - 1].correct_answer) { current_button.id = 'correct' }
        if (current_button.id != 'wrong' && current_button.id != 'correct') { current_button.style.visibility = 'hidden' }
        // console.log(current_button.id)
      }
    }
    // TODO: check if all questions have been answered
    if (current_question < number_of_questions) {
      // TODO: check if all players had the question
      if(activePlayer < number_of_players) {
        // console.log('Quiz-Player: ', number_of_players)
        activePlayer++
        setTimeout(() => {
          router.navigate('quiz?mulitplayer=' + multiplayer + '&amountPlayer=' + number_of_players + '&question=' + current_question + '&player=' + activePlayer)
        }, 1500)
      }
      else {
        console.log('new scores: ', score)
        activePlayer = 1
        current_question++
        setTimeout(() => {
          router.navigate('quiz?mulitplayer=' + multiplayer + '&amountPlayer=' + number_of_players + '&question=' + current_question + '&player=' + activePlayer)
        }, 1500)
      }
    }
    else if (current_question == number_of_questions) {
      if (score.length == number_of_players){
        localStorage.setItem('scores', JSON.stringify(score))
      }
      else{
        for(let i = 0; i < number_of_players; i++) {
          if (score[i]){
            continue
          }
          else {
            score[i] = 0
          }
        }
        localStorage.setItem('scores', JSON.stringify(score))
      }
      console.log('quizzz ende!!!!!')
      setTimeout(() => {
        router.navigate('/end')
      }, 3000)
    }
  }


    // if()



  const displayNumberOfQuestionAndPlayer = () => {
    let response = 'Question ' + current_question
    if(multiplayer == false) {
      return response
    }
    else {
      return response + ' | Player' + activePlayer
    }
  }


  return (
    <section className={bem('quiz')}>
      <article className={bem('question')}>
        <h2 className={bem('question', 'h2')}>{ displayNumberOfQuestionAndPlayer() }</h2>
        <p className={bem('question', 'p')}>{question_and_answers[current_question - 1].question}</p>
      </article>
      <article className={bem('answers')}>
        <p className={bem('answers', 'p')}><button className={bem('answers', 'button')} onClick={checkAnswer}>{answer1}</button>
          <button className={bem('answers', 'button')} onClick={checkAnswer}>{answer2}</button></p>
        <p className={bem('answers', 'p')}><button className={bem('answers', 'button')} onClick={checkAnswer}>{answer3}</button>
          <button className={bem('answers', 'button')} onClick={checkAnswer}>{answer4}</button></p>
      </article>
    </section>
  )
}
export default Quiz
