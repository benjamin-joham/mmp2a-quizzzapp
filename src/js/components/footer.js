import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import bem from 'bem-names'
import * as React from 'jsx-dom'
import Impressum from '../components/impressum'
import Privacy from '../components/privacy'

const Footer = () => {
  const f = React.createRef()

  const clickImpressum = (event) => {
    f.current.appendChild(<Impressum/>)
    let link_impr = document.getElementById('footer_link_impr')
    link_impr.style.visibility = 'hidden'
  }

  const clickPrivacy = (event) => {
    f.current.appendChild(<Privacy/>)
    let link_priv = document.getElementById('footer_link_priv')
    link_priv.style.visibility = 'hidden'
  }

  return (
    <div className={bem('div')} ref={f}>
      <footer className={bem('footer')}>
        <a id='footer_link_impr' className={bem('footer', 'a')} href='#impressum' onClick={ clickImpressum } >About</a>
        <a id='footer_link_priv' className={bem('footer', 'a')} href='#privacy' onClick={ clickPrivacy} >Privacy</a>
      </footer>
    </div>
  )
}

export default Footer
