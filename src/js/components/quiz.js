import {h} from 'jsx-dom'
import bem from 'bem-names'

const Quiz = () => {
    return(
        <section className={bem('quiz')}>
        <article className={bem('question')}>
            <h2 className={bem('question', 'h2')}>Question 1</h2>
            <p className={bem('question', 'p')}>What is the name of the planet that the Doctor from television series &quot;Doctor Who&quot; comes from?</p>
        </article>
        <article className={bem('answers')}>
            <p className={bem('answers','p')}><button className={bem('answers','button')}>A: Gallifreyh hhhhhhhhh hhhhhhkjh khgkjffjhgjh fhfd jhgfgkjgf</button>
            <button className={bem('answers','button')}>B: Sontar</button></p>
            <p className={bem('answers','p')}><button className={bem('answers','button')}>C: Skaro</button>
            <button className={bem('answers','button')}>D: Mondas</button></p>
        </article>
        </section>
    )
}

export default Quiz