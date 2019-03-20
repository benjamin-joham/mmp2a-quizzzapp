import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import * as React from 'jsx-dom'
import bem from 'bem-names'
import { GetAllUsers, AddNewQuestionsetToFirestore, updateFirestore } from '../modules/firebase'
import router from '../modules/router'

const End = ({ children, ...props }) => {
  let correct_questions = JSON.parse(localStorage.getItem('scores'))
  let questions_total
  if (window.challenge) {
    questions_total = Object.values(window.questions).length
  } else {
    questions_total = window.questions.length
  }
  let number_of_players = correct_questions.length
  let button1_text = 'View statistic!'
  let button2_text = 'Play again!'
  let button3_text = 'Challenge a friend!'
  let result = ''
  let logged_in = window.user

  let checkIfNumber = (number) => {
    if (number != null) { return number } else { return 0 }
  }

  let getContent = () => {
    let add
    if (number_of_players == 1) { // singleplayer
      if (logged_in) { add = addButtons() }
      result = 'You answered ' + checkIfNumber(correct_questions[0]) + '/' + questions_total + ' Questions correct.'
      return (
        <div className={bem('end', 'div')}>
          <h2 className={bem('end', 'h2')}>{result}</h2>
          {add}
        </div>
      )
    } else { // multiplayer
      let content = <div className={bem('end', 'div')}></div>
      for (let i = 1; i <= number_of_players; i++) {
        result = 'Player ' + i + ' answered ' + checkIfNumber(correct_questions[i - 1]) + '/' + questions_total + ' Questions correct.'
        content.appendChild(<h2 className={bem('end', 'h2')}>{result}</h2>)
      }
      return content
    }
  }

  let sendChallenge = async (challenger) => {
    let questionarr = []
    let answers = {}
    let answerArr
    let data = {}

    for (let i = 0; i < questions_total; i++) {
      answerArr = []
      questionarr.push(window.questions[i].question)
      answerArr.push(window.questions[i].correct_answer)
      window.questions[i].incorrect_answers.forEach(wrong => {
        answerArr.push(wrong)
      })
      answers.correct = answerArr[0]
      answers.wrong = [answerArr[1], answerArr[2], answerArr[3]]
      data[i] = {
        question: window.questions[i].question,
        correct_answer: answerArr[0],
        incorrect_answers: [answerArr[1], answerArr[2], answerArr[3]]
      }
    }

    let points = JSON.parse(localStorage.getItem('scores'))

    let response = await AddNewQuestionsetToFirestore(data, window.user.name, challenger, points[0])
    let container
    container = document.getElementsByClassName('end__div--challenge')[0]
    container.innerHTML = ''

    container.appendChild(<h1>{response}</h1>)
    setTimeout(() => {
      router.navigate('/profile')
    }, 1000)
  }

  const showChallenger = async () => {
    let users = await GetAllUsers()
    let container = document.querySelector('section.end')
    let select = <select className={bem('end', 'select')} id='challenger' name="challenger" size="5" onClick={(e) => console.log(e.target)}></select>
    { users.forEach(i => {
      if (i != window.user.name) { select.appendChild(<option className={bem('select','option')} value={i}>{i}</option>) }
    }) }
    let content = container.appendChild(
      <div className={bem('end', 'div', ['challenge'])}>
        <h1 className={bem()}>Choose your Challenger</h1>
        <form className={bem('end','form')}>
          {select}
          <button onClick={
            (e) => {
              e.preventDefault()
              let element
              element = document.getElementById('challenger')
              let challenger = element.value
              sendChallenge(challenger)
            }
          }>
        Challenge!
          </button>
        </form>
      </div>
    )
    return content
  }

  let addButtons = () => {
    if (logged_in) {
      return (
        <div>
          <button className={bem('button')} onClick={() => {
            updateFirestore()
            router.navigate('/profile')
          }}>
            {button1_text}
          </button>
          <button className={bem('button')} onClick={() => showChallenger()}>
            {button3_text}
          </button>
        </div>
      )
    }
  }

  return (
    <section className={bem('end')}>
      <h1 className={bem('end', 'h1')}>You finished the Quiz!</h1>
      {getContent()}
      <button className={bem('button')}
        onClick={() => {
          localStorage.removeItem('scores')
          router.navigate('/start')
        }
        }>
        {button2_text}
      </button>
    </section>
  )
}

export default End
