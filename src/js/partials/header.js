
import { h } from 'jsx-dom'

import bem from 'bem-names'

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
