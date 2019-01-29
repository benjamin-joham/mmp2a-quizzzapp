import {h} from 'jsx-dom'
import * as React from "jsx-dom"
import bem from 'bem-names'
import api from '../openTriviaApi'


const Quiz = () => {
    let question_and_answers
    const api_call= new api
    const question = React.createRef();
    const answer1 = React.createRef();
    const answer2 = React.createRef();
    const answer3 = React.createRef();
    const answer4 = React.createRef();
       
    api_call.getData(5).then((x)=> {
        question_and_answers=x
        x.map((item)=> {
            console.log(item)
        })
        question.current.innerHTML = question_and_answers[0].question
        answer1.current.innerHTML = question_and_answers[0].correct_answer
        answer2.current.innerHTML = question_and_answers[0].incorrect_answers[0]
        answer3.current.innerHTML = question_and_answers[0].incorrect_answers[1]
        answer4.current.innerHTML = question_and_answers[0].incorrect_answers[2]
    })

    return(
        <section className={bem('quiz')}>
        <article className={bem('question')}>
            <h2 className={bem('question', 'h2')}>Question 1</h2>
            <p className={bem('question', 'p')} ref={question}></p>
        </article>
        <article className={bem('answers')}>
            <p className={bem('answers','p')}><button className={bem('answers','button')} ref={answer1}></button>
            <button className={bem('answers','button')} ref={answer2}></button></p>
            <p className={bem('answers','p')}><button className={bem('answers','button')} ref={answer3}></button>
            <button className={bem('answers','button')} ref={answer4}></button></p>
        </article>
        </section>
    )
}
//What is the name of the planet that the Doctor from television series &quot;Doctor Who&quot; comes from?
export default Quiz