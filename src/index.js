import './sass/style.scss'
import '@babel/polyfill'
import router from './js/modules/router'

router.resolve()

console.log(process.env.FIREBASE_KEY)
console.log(process.env.all)
