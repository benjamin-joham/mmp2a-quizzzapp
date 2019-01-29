import {h} from 'jsx-dom'
import * as JSX from "jsx-dom"
import bem from 'bem-names'
import api from '../openTriviaApi'


const Quiz = () => {
    let number_of_questions=5;
    let number_of_player=1;
    let score=0;
    let current_question=1
    let question_and_answers
    const api_call= new api
    const nr = JSX.createRef();
    const question = JSX.createRef();
    const answer1 = JSX.createRef();
    const answer2 = JSX.createRef();
    const answer3 = JSX.createRef();
    const answer4 = JSX.createRef();
       
    api_call.getData(number_of_questions).then((x)=> {
        question_and_answers=x
        x.map((item)=> {
            console.log(item)
        })
        nr.current.innerHTML = "Question "+current_question
        question.current.innerHTML = question_and_answers[0].question

        let arr = [question_and_answers[0].correct_answer,question_and_answers[0].incorrect_answers[0],question_and_answers[0].incorrect_answers[1],question_and_answers[0].incorrect_answers[2]]
        
        answer1.current.innerHTML ="A: "+ arr[0]  //correct
        answer2.current.innerHTML ="B: "+ arr[1]
        answer3.current.innerHTML ="C: "+ arr[2]
        answer4.current.innerHTML = "D: "+arr[3]
        let rand=Math.floor((Math.random() * 3))
        answer1.current.innerHTML = "A: "+arr[rand]
        switch(rand) {
            case 1:
            answer2.current.innerHTML ="B: "+ arr[0]  //correct
                break;
            case 2:
            answer3.current.innerHTML ="C: "+ arr[0]
                break;
            case 3:
            answer4.current.innerHTML ="D: "+ arr[0]
                break;
            default:
                break;
        }
    })

    return(
        <section className={bem('quiz')}>
        <article className={bem('question')}>
            <h2 className={bem('question', 'h2')} ref={nr}></h2>
            <p className={bem('question', 'p')} ref={question}></p>
        </article>
        <article className={bem('answers')}>
            <p className={bem('answers','p')}><button className={bem('answers','button')} active='false' ref={answer1}></button>
            <button className={bem('answers','button')} active='false' ref={answer2}></button></p>
            <p className={bem('answers','p')}><button className={bem('answers','button')} active='false' ref={answer3}></button>
            <button className={bem('answers','button')} active='false' ref={answer4}></button></p>
        </article>
        </section>
    )
}
export default Quiz