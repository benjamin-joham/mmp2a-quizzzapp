import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import bem from 'bem-names'

const clickImpressum = (event) => {
  console.log(event.target)
  let elem = event.target
  if (elem.id == 'btn_players_active') {
    elem.removeAttribute('id')
  } else {
    document.getElementById('btn_players_active').removeAttribute('id')
    elem.id = 'btn_players_active'
  }
}

const Footer = () => {
  return (
      <footer class={bem('footer')}>
        <a class={bem('footer', 'a')} onClick={ clickImpressum } >About</a>
    </footer>
  )
}

export default Footer