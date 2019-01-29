// import logo
import logo from './../../images/QA_logo_white.svg'
import * as React from 'jsx-dom'
import {h} from 'jsx-dom'
import * as Firebase from '../modules/firebase';


const handleSignin = async event => {
  // event.preventDefault()
  let msg = await Firebase.userLogin()
  if(msg.message) return
  //window.location.reload()
}

const handleSignout = async event => {
  await Firebase.userLogout()
  //window.location.reload()
}

const Header = ({children, ...props}) => {
  const header_right = React.createRef()

  Firebase.subscribeToFirebaseAuth(user => {
    header_right.current.innerHTML = ''
    if(user) {
      header_right.current.appendChild(
        <a onClick=''>Profile</a>
      )
      header_right.current.appendChild(
        <a onClick={()=> handleSignout()}>Logout</a>
      )
    }
    else {
      header_right.current.appendChild(
        <a onClick={() => handleSignin()}>Login</a>
      )
    }
  })

  // let logged_in
  // if (localStorage.getItem('user')) { //eingeloggt
  //   logged_in = () => {
  //     return(
  //       <div id="header_right">
  //         <a onClick=''>Profile</a>
  //         <a onClick={userLogout}>Logout</a>
  //       </div>
  //     )
  //   }
  // } else {
  //   logged_in = () => {
  //     return(
  //       <div id="header_right">
  //         <a onClick={userLogin}>Login</a>
  //       </div>
  //     )
  //   }
  // }

  let inQuiz
  if(props.data == 'quiz') {
    inQuiz = <h1>{props.value}</h1>
  }

  return (
    <header className="header">
      <div id="header_left">
          <img src={logo} alt="App-Logo" id="header_logo" onClick={() => window.location.assign('/')}/>
      </div>
      <div id="header_middle">
          {inQuiz}
      </div>
      <div ref={header_right} id="header_right"></div>
    </header>
  )
}

export default Header
