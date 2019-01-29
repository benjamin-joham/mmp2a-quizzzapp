// import logo
import logo from './../../images/QA_logo_white.svg'
import { h } from 'jsx-dom'

const Header = ({children, ...props}) => {

  let logged_in
  if (localStorage.getItem('user')) { //eingeloggt
    logged_in = <a href="#">Profile</a>
  } else {
    logged_in = <a href="#">Login</a>
  }

  let inQuiz
  if(props.data == 'quiz') {
    inQuiz = <h1>{props.value}</h1>
  }

  return(
    <header className="header">
    <div id="header_left">
        <img src={logo} alt="App-Logo" id="header_logo" />
    </div>
    <div id="header_middle">
        {inQuiz}
    </div>
    <div id="header_right">
        {logged_in}
    </div>
</header>
  )
}

export default Header
