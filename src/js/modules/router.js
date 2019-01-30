import Navigo from 'navigo'



import { h } from 'jsx-dom'
import LoginScreen from '../partials/loginScreen';
import StartScreen from '../partials/startScreen';
import QuizzScreen from '../partials/quizzScreen';
import ProfileScreen from '../partials/profileScreen';
const router = new Navigo(window.location.origin)

const body = document.querySelector('body')

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
      'quiz/:id': (params) => {
        body.innerHTML = ''
        body.appendChild(<QuizzScreen question={params.id}/>)
      },
      'test': () => {
      },
      'profile':()=>{
        body.innerHTML=''
        body.appendChild(<ProfileScreen />)
      }
    });

  export default router;
