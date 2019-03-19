import bem from 'bem-names'
import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define

const clickhandlerPlayers = (event) => {
  let elem = event.target
  if (elem.id == 'btn_players_active') {
    elem.removeAttribute('id')
  } else {
    document.getElementById('btn_players_active').removeAttribute('id')
    elem.id = 'btn_players_active'
  }
}
const clickhandlerQuestions = (event) => {
  let elem = event.target
  if (elem.id == 'btn_questions_active') {
    elem.removeAttribute('id')
  } else {
    document.getElementById('btn_questions_active').removeAttribute('id')
    elem.id = 'btn_questions_active'
  }
}

const Settings = () => {
  return (
    <section class={bem('settings')}>
      <div class={bem('settings', 'div')}>
        <h2 class={bem('settings', 'h2')}>Number of Players</h2>
        <div class={bem('settings', 'div', ['players'])}>
          <button id='btn_players_active' class={bem('settings', 'button')} onClick={ clickhandlerPlayers } value='1'>1</button>
          <button class={bem('settings', 'button')} onClick={ clickhandlerPlayers } value='2'>2</button>
          <button class={bem('settings', 'button')} onClick={ clickhandlerPlayers } value='3'>3</button>
          <button class={bem('settings', 'button')} onClick={ clickhandlerPlayers } value='4'>4</button>
        </div>
      </div>
      <div class={bem('settings', 'div')}>
        <h2 class={bem('settings', 'h2')}>Number of Questions</h2>
        <div class={bem('settings', 'div', ['questions'])}>
          <button id='btn_questions_active' class={bem('settings', 'button')} onClick={ clickhandlerQuestions } value='5'>5</button>
          <button class={bem('settings', 'button')} onClick={ clickhandlerQuestions } value='10'>10</button>
          <button class={bem('settings', 'button')} onClick={ clickhandlerQuestions } value='15'>15</button>
          <button class={bem('settings', 'button')} onClick={ clickhandlerQuestions } value='20'>20</button>
        </div>
      </div>
    </section>
  )
}

export default Settings