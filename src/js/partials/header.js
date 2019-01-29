
import { h } from 'jsx-dom'
import bem from 'bem-names'
import { userLogin, userLogout } from './../modules/firebase'
import logo from './../../images/QA_logo_white.svg'

export default class header {
  constructor() {
    const header = document.querySelector('header')
    return header
  }


  renderLogin() {
    header = document.querySelector('header')
    header.innerHTML = ''
    header.classList.add('header')

    // logo - header left
    let header_left = <div id='header_left' className={bem('header','div',['left'])}></div>
    header_left.appendChild(<img src='../images/QA_logo_white.svg' alt='App-Logo' id='header_logo' className={bem('header','img')}></img>)

    let header_middle = <div id='header_middle' className={bem('header','div',['center'])}></div>
    header_middle.appendChild(<span className={bem('header','span')}>1/5</span>)

    let header_right = <div id='header_right' className={bem('header','div',['right'])}></div>

    let link = <a href='#'></a>
    link.appendChild(<i className='fas fa-times'></i>)
    header_right.appendChild(link)

    // count of questions
    header.appendChild(header_left)
    header.appendChild(header_middle)
    header.appendChild(header_right)
    // content.appendChild(<h1 className='header__h1'>Test</h1>)
    // content.appendChild(<h1 className='header__h1'>Test</h1>)
    return (header)
  }

}

export const Header_right = () =>{
  return(
    <div id='header_right' className={bem('header','div',['right'])}>
      <a onClick={window.location.assign('profile')}>Profile</a>
    </div>
  )
}

const userLoginHandler = async (event) => {
  event.preventDefault()

  let response = await userLogin()
  console.log(response)

  localStorage.setItem('user', JSON.stringify(response.user))
}

export const Header = () => {
  let authentication = () => {
    if (localStorage.getItem('user')) {

        <a href="#">Profile</a>

    }
    else {
        <a href="#">Login</a>
    }
  }

  return(
    <header class='header'>
    <div id='header_left' className={bem('header','div',['left'])}>
      <a href="/">
        <img src={logo} alt='App-Logo' id='header_logo' className={bem('header','img')} ></img>
      </a>
    </div>
    <div id='header_right' className={bem('header','div',['right'])}>
      {authentication}
    </div>
  </header>
  )
}

// <header class='header'>
//   <div id='header_left' class='header__div header__div--left'>
//     <a href="/">
//       <img src="<%= require('./images/QA_logo_white.svg') %>" alt='App-Logo' id='header_logo' class='header__img' onclick="{() => }"></img>
//     </a>
//   </div>
// </header>
