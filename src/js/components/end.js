import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import * as React from 'jsx-dom'
import bem from 'bem-names'
import { userLogin } from '../modules/firebase'
import router from '../modules/router'

const End = () => {
let correct_questions=3;
let questions_total=5;
let number_of_players=2;
let button1_text
let button2_text
let result=''
let user
    
if(number_of_players==1){   //singleplayer
    result='You answered '+correct_questions+'/'+questions_total+' Questions correct.'
    if (user) {
        button1_text='View statistic!'
        button2_text='Play again!'
    } else {
        button1_text='Save statistic!'
        button2_text='Play again!'
    }
} else {    //multiplayer
    for(let i = 1; i<= number_of_players; i++)
    {
        result+='Player '+i+' answered '+correct_questions+'/'+questions_total+' Questions correct. '
    }
    if (user) {
        button1_text='View statistic!'
        button2_text='Play again!'
    } else {
        button1_text='Save statistic!'
        button2_text='Play again!'
    }
}



  return (
    <section className={bem('login')}>
    <h1 className={bem('login','h1')}>You finished the Quiz!</h1>
    <h2 className={bem('login','h2')}> {result}</h2>
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
