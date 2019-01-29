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

        let arr = [question_and_answers[0].correct_answer,question_and_answers[0].incorrect_answers[0],question_and_answers[0].incorrect_answers[1],question_and_answers[0].incorrect_answers[2]]
        
        answer1.current.innerHTML = arr[0]
        answer2.current.innerHTML = arr[1]
        answer3.current.innerHTML = arr[2]
        answer4.current.innerHTML = arr[3]
        let rand=Math.floor((Math.random() * 3))
        answer1.current.innerHTML = arr[rand]
        switch(rand) {
            case 1:
            answer2.current.innerHTML = arr[0]
                break;
            case 2:
            answer3.current.innerHTML = arr[0]
                break;
            case 3:
            answer4.current.innerHTML = arr[0]
                break;
            default:
                break;
        }
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
export default Quiz