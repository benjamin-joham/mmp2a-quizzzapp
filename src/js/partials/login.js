// import bem from 'bem-names'
// import firebase from 'firebase/app'
// import 'firebase/auth'

// export default class login {
//   constructor() {
//     const config = {apiKey: 'AIzaSyCYwYxJ-Mmwz47-PpFXtdONtBjUUDR8-7E',
//       authDomain: 'mmp2a-85c2b.firebaseapp.com',
//       databaseURL: 'https://mmp2a-85c2b.firebaseio.com/',
//       projectId: 'mmp2a-85c2b',
//       storageBucket: 'mmp2a-85c2b.appspot.com',
//       messagingSenderId: '519321050416',
//     }
//     firebase.initializeApp(config)
//     let test_firebase = () => {
//       firebase.database().ref()
//       .then(
//         console.log(test_firebase)
//       )
//     }
//   }

//   loginAnonymously() {
//     firebase.auth().onAuthStateChanged(function(user) {
//       if (user) {
//         // User is signed in.
//         console.log(user);
//         var isAnonymous = user.isAnonymous;
//         var uid = user.uid;
//         // ...
//       } else {
//         // User is signed out.
//         // ...
//       }
//       // ...
//     });
//   }
// }
