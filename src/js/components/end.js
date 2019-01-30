import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import * as React from 'jsx-dom'
import bem from 'bem-names'
import { userLogin } from '../modules/firebase'
import router from '../modules/router'

const End = ({children, ...props}) => {
let correct_questions = JSON.parse(localStorage.getItem('scores'))
let questions_total = JSON.parse(localStorage.getItem('questions')).length;
let number_of_players = correct_questions.length;
let button1_text = 'View statistic!'
let button2_text = 'Play again!'
let result=''

const resultContainer = document.querySelector('.end__div')

let checkIfNumber = (number) => {
  if(number != null) { return number }
  else { return 0 }
}

let getContent = () =>  {
  if(number_of_players==1){   //singleplayer
    result='You answered '+ checkIfNumber(correct_questions[0])  +'/'+questions_total+' Questions correct.'
    return (
      <div className={bem('end','div')}>
        <h2 className={bem('end','h2')}>{result}</h2>
      </div>
    )
  }
  else {    //multiplayer
    let content = <div className={bem('end','div')}></div>
      for(let i = 1; i <= number_of_players; i++)
      {
          result = 'Player '+ i +' answered ' + checkIfNumber(correct_questions[i-1]) +'/'+questions_total+' Questions correct.'
          content.appendChild(<h2 className={bem('end','h2')}>{result}</h2>)
      }
      return content
  }
}

  return (
    <section className={bem('end')}>
    <h1 className={bem('end','h1')}>You finished the Quiz!</h1>
    {getContent()}
    <button className={bem('button')} onClick={() => router.navigate('/profile')}>
        {button1_text}
      </button>
      <button className={bem('button')} onClick={() => router.navigate('/start')}>
        {button2_text}
      </button>
    </section>
  )
}

export default End
