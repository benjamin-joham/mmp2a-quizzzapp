import { h } from 'jsx-dom'
import logo from './../../images/QA_logo_white.svg'
import bem from 'bem-names'

const Header = () => {
  return (
    <header className='header'>
      <div id='header_left' className={bem('header','div',['left'])}>
        <img src={logo} alt='App-Logo' id='header_logo' className={bem('header','img')}></img>
      </div>
      </header>
      )
    }
    export default Header

    // <div id='header_middle' className={bem('header','div',['center'])}>
    //   <span className={bem('header','span')}>1/5</span>
    // </div>
    // <div id='header_right' className={bem('header','div',['right'])}>
    //   <a href='#'><i className='fas fa-times'></i></a>
    // </div>
