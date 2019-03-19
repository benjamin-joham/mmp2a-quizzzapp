import Navigo from 'navigo'
import LoginScreen from '../partials/loginScreen'
import StartScreen from '../partials/startScreen'
import QuizzScreen from '../partials/quizzScreen'
import ProfileScreen from '../partials/profileScreen'
import EndScreen from '../partials/endScreen'
import bem from 'bem-names'

const router = new Navigo(window.location.origin)
const callbacks = []
const body = document.querySelector('body')

router.notFound(() => {
  body.appendChild(
    <div className={bem('notfound', 'div')}>
      <h1>404 Page not found :(</h1>
      <a href='#' onClick={() => {
        event.preventDefault()
        router.navigate('/')
      }}>Back to the beginning...
      </a>
    </div>
  )
})

router
  .on(
    {
      '/': () => {
        body.innerHTML = ''
        body.appendChild(<LoginScreen/>)
      },
      'start': () => {
        body.innerHTML = ''
        body.appendChild(<StartScreen />)
      },
      'quiz*': (params, query) => {
        body.innerHTML = ''
        body.appendChild(<QuizzScreen query={query}/>)
      },
      'end': () => {
        body.innerHTML = ''
        body.appendChild(<EndScreen />)
      },
      'profile': () => {
        body.innerHTML = ''
        body.appendChild(<ProfileScreen />)
      }
    })

router.hooks({
  after: () => {
    callbacks.forEach(callback => callback(null))
  }
})

export function updateHook (callback) {
  callbacks.push(callback)
}

export default router