import logo from './../../images/QA_logo_white.svg'
import * as React from 'jsx-dom'
import * as Firebase from '../modules/firebase'
import router, { updateHook } from '../modules/router'
import bem from 'bem-names'
import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define

const handleSignout = async event => {
  Firebase.userLogout()
  router.navigate('/')
}

const Header = ({ children, ...props }) => {
  const headerRight = React.createRef()

  const updateHeaderAuth = user => {
    headerRight.current.innerHTML = ''

    if (!user) {
      user = window.user
    }

    if (user) {
      if (props.data == 'quiz') {
        headerRight.current.appendChild(
          <a href='#' onClick={() => {
            event.preventDefault()
            router.navigate('/start')
          }}>
            <i class="fas fa-times"></i>
          </a>
        )
      } else {
        headerRight.current.appendChild(
          <a href='#' onClick={() => {
            event.preventDefault()
            router.navigate('/profile')
          } }>Profile </a>
        )
        headerRight.current.appendChild(
          <a href='#' onClick={() => {
            event.preventDefault()
            handleSignout()
          }}> Logout</a>
        )
      }
    } else {
      if (props.data == 'quiz') {
        headerRight.current.appendChild(
          <a href='#' onClick={() => {
            event.preventDefault()
            router.navigate('/start')
          }}>
            <i class="fas fa-times"></i>
          </a>
        )
      } else {
        headerRight.current.appendChild(
          <a href='#' onClick={
            async (e) => {
              let response = await Firebase.userLogin()
              event.preventDefault()
              if (response) router.navigate('/start')
            }
          }>Login</a>
        )
      }
    }
  }

  let inQuiz
  if (props.data == 'quiz') {
    inQuiz = <h1>{props.value}</h1>
  }

  Firebase.subscribeToFirebaseAuth(updateHeaderAuth)
  updateHook(updateHeaderAuth)

  return (
    <header className="header">
      <div id="header_left">
        <a href='#' className={bem('header', 'a')} onClick={() => {
          event.preventDefault()
          router.navigate('/')
        }}
        ><img src={logo} alt="App-Logo" id="header_logo" className={bem('header', 'img')} /></a>
      </div>
      <div className={bem('header', 'div', ['center'])}>
        {inQuiz}
      </div>
      <div ref={headerRight} className={bem('header', 'div', ['right'])}>
      </div>
    </header>
  )
}

export default Header
