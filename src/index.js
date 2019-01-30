import './sass/style.scss'
import '@babel/polyfill'
import router from './js/modules/router'
import _ from 'lodash'

router.resolve()

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
