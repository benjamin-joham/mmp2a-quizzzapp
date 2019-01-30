// import logo
import logo from './../../images/QA_logo_white.svg'
import * as React from 'jsx-dom'
import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import * as Firebase from '../modules/firebase'
import router, { updateHook } from '../modules/router'
import bem from 'bem-names'


const handleSignin = async event => {
  // event.preventDefault()
  let msg = await Firebase.userLogin()
  if (msg.message) return
  // window.location.reload()
}

const handleSignout = async event => {
  await Firebase.userLogout()
  // window.location.reload()
}

const Header = ({ children, ...props }) => {
  const header_right = React.createRef()

  const updateHeaderAuth = (user => {
    header_right.current.innerHTML = ''

    if(!user) {
      user = window.user
    }

    if (user) {
      header_right.current.appendChild(
        <a onClick={() => { router.navigate('/profile')} }>Profile |</a>
      )
      header_right.current.appendChild(
        <a onClick={() => handleSignout()}> Logout</a>
      )
    } else {
      header_right.current.appendChild(
        <a onClick={() => handleSignin()}>Login</a>
      )
    }
  })

  let inQuiz
  if (props.data == 'quiz') {
    inQuiz = <h1>{props.value}</h1>
  }

  Firebase.subscribeToFirebaseAuth(updateHeaderAuth)
  updateHook(updateHeaderAuth)

  return (
    <header className="header">
      <div id="header_left">
        <img src={logo} alt="App-Logo" id="header_logo" className={bem('header','img')} onClick={() => router.navigate('/')}/>
      </div>
      <div className={bem('header','div',['center'])}>
        {inQuiz}
      </div>
      <div ref={header_right} className={bem('header','div',['right'])}></div>
    </header>
  )
}

export default Header
