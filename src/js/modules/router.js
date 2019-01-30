import Navigo from 'navigo'
import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define
import LoginScreen from '../partials/loginScreen'
import StartScreen from '../partials/startScreen'
import QuizzScreen from '../partials/quizzScreen'
import ProfileScreen from '../partials/profileScreen';
import EndScreen from '../partials/endscreen';
import { checkAuthState } from './firebase'

const router = new Navigo(window.location.origin)

const callbacks = []

const body = document.querySelector('body')

// router.hooks({
//   before: async (done, params) => {
//     console.log('hook before')
//     // let user = () => { return checkAuthState() }
//     // console.log(user.then(x => x))
//     // if (user) done()
//   }
// })

router.notFound(() => {
  body.appendChild(<h1>404 Page not found</h1>)
  console.log('404')
})

router
  .on(
    {
      '/': () => {
        console.log('jetzt in root')
        // append LoginScreen
        body.innerHTML = ''
        body.appendChild(<LoginScreen/>)
      },
      'start': () => {
      // append StartScreen
        body.innerHTML = ''
        body.appendChild(<StartScreen />)
      },
      'quiz*': (params, query) => {
        body.innerHTML = ''
        body.appendChild(<QuizzScreen query={query}/>)
      },
      'end': () => {
        body.innerHTML = ''
        body.appendChild(<EndScreen/>)
      },
      'profile':()=>{
        body.innerHTML=''
        body.appendChild(<ProfileScreen />)
      }
    })


router.hooks ({
  after: () => {
    callbacks.forEach(callback => callback(null))
  }
})

export function updateHook(callback) {
  callbacks.push(callback)
}

export default router
