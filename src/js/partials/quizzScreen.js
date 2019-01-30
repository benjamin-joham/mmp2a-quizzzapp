import Header from '../components/header'
import { h } from 'jsx-dom'
import Quiz from '../components/quiz'

const QuizzScreen = (params) => {
  let amountOfQuestions = JSON.parse(localStorage.getItem('questions')).length
  console.log(amountOfQuestions)
  console.log(params.question)

  return (
    <div id='root'>
      <Header data='quiz' value={params.question + '/' + amountOfQuestions}/>
      <main>
        <Quiz question={params.question}/>
      </main>
    </div>
  )
}

export default QuizzScreen
