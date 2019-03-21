import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import * as React from 'jsx-dom'
import bem from 'bem-names'
import { GetAllUsers, AddNewQuestionsetToFirestore, updateFirestore } from '../modules/firebase'
import router from '../modules/router'

const End = ({ children, ...props }) => {
  let correctQuestions = JSON.parse(localStorage.getItem('scores'))
  let questionsTotal
  if (window.challenge) {
    questionsTotal = Object.values(window.questions).length
  } else {
    questionsTotal = window.questions.length
  }
  let numberOfPlayers = correctQuestions.length
  let button1Text = 'View statistic!'
  let button2Text = 'Play again!'
  let button3Text = 'Challenge a friend!'
  let result = ''
  let loggedIn = window.user

  let checkIfNumber = (number) => {
    if (number != null) { return number } else { return 0 }
  }

  let getContent = () => {
    let add
    if (numberOfPlayers == 1) { // singleplayer
      if (loggedIn) { add = addButtons() }
      result = 'You answered ' + checkIfNumber(correctQuestions[0]) + '/' + questionsTotal + ' Questions correct.'
      return (
        <div className={bem('end', 'div')}>
          <h2 className={bem('end', 'h2')}>{result}</h2>
          {add}
        </div>
      )
    } else { // multiplayer
      let content = <div className={bem('end', 'div')}></div>
      for (let i = 1; i <= numberOfPlayers; i++) {
        result = 'Player ' + i + ' answered ' + checkIfNumber(correctQuestions[i - 1]) + '/' + questionsTotal + ' Questions correct.'
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

    for (let i = 0; i < questionsTotal; i++) {
      answerArr = []
      questionarr.push(window.questions[i].question)
      answerArr.push(window.questions[i].correctAnswer)
      window.questions[i].incorrectAnswers.forEach(wrong => {
        answerArr.push(wrong)
      })
      answers.correct = answerArr[0]
      answers.wrong = [answerArr[1], answerArr[2], answerArr[3]]
      data[i] = {
        question: window.questions[i].question,
        correctAnswer: answerArr[0],
        incorrectAnswers: [answerArr[1], answerArr[2], answerArr[3]]
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

    users.forEach(i => {
      if (i != window.user.name) {
        select.appendChild(<option className={bem('select', 'option')} value={i}>{i}</option>)
      }
    })
    let content = container.appendChild(
      <div className={bem('end', 'div', ['challenge'])}>
        <h1 className={bem()}>Choose your Challenger</h1>
        <form className={bem('end', 'form')}>
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
    if (loggedIn) {
      return (
        <div>
          <button className={bem('button')} onClick={() => {
            updateFirestore()
            router.navigate('/profile')
          }}>
            {button1Text}
          </button>
          <button className={bem('button')} onClick={() => showChallenger()}>
            {button3Text}
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
        {button2Text}
      </button>
    </section>
  )
}

export default End
