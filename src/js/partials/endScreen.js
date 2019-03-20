import Header from '../components/header'
import End from '../components/end'
import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define

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
