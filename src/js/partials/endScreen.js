import Header from '../components/header'
import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import End from '../components/end'

const EndScreen = () => {
  return (
    <div id='root'>
      <Header/>
      <main>
        <End/>
      </main>
    </div>
  )
}

export default EndScreen
