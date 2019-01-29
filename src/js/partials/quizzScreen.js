import Header from '../components/header'
import { h } from 'jsx-dom'
import Quiz from '../components/quiz';


const QuizzScreen = () => {

  return(
    <div id='root'>
      <Header data='quiz' value='1/5'/>
      <main>
      <Quiz />
      </main>
    </div>
  )
}

export default QuizzScreen
