import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import bem from 'bem-names'
import * as React from 'jsx-dom'
import Impressum from '../components/impressum';

const Footer = () => {
    const impr = React.createRef()
    
    const clickImpressum = (event) => {
            impr.current.appendChild(<Impressum/>)
            let link = document.getElementById('footer_link')
            link.style.visibility = 'hidden'
    }


  return (
      <div className={bem('div')} ref={impr}>
      <footer className={bem('footer')}>
        <a id='footer_link' className={bem('footer', 'a')} href='#impressum' onClick={ clickImpressum } >About</a>
    </footer>
    </div>
  )
}

export default Footer