import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import bem from 'bem-names'
import * as React from 'jsx-dom'
import Impressum from '../components/impressum';

const Footer = () => {
    const impr = React.createRef()
    
    const clickImpressum = (event) => {
        if(/*impressum schon da */ false)  
        {
            //hide impressum
        }
        else{
            impr.current.appendChild(<Impressum/>)
        }
    }


  return (
      <div className={bem('div')} ref={impr}>
      <footer className={bem('footer')}>
        <a className={bem('footer', 'a')} href='#impressum'onClick={ clickImpressum } >About</a>
    </footer>
    </div>
  )
}

export default Footer