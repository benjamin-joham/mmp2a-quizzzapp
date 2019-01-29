import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { h } from 'jsx-dom'

let config = {
  apiKey: 'AIzaSyCYwYxJ-Mmwz47-PpFXtdONtBjUUDR8-7E',
  authDomain: 'mmp2a-85c2b.firebaseapp.com',
  databaseURL: 'https://mmp2a-85c2b.firebaseio.com/',
  projectId: 'mmp2a-85c2b',
  storageBucket: 'mmp2a-85c2b.appspot.com',
  messagingSenderId: '519321050416',
}

// TODO: Authentication
const provider = new firebase.auth.GoogleAuthProvider();
firebase.initializeApp(config)
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    // if(window.user != user) { window.user = user }
    console.log(user);

    // var isAnonymous = user.isAnonymous;
    // var uid = user.uid;
    // ...
  } else {
    // User is signed out.
    window.user = null;
    console.log('not logged in right now')
    // ...
  }
  // ...
});

export const userLogin = () => {
  // Anonymous
  /*
  firebase
  .auth()
  .signInAnonymously()
  .then(() => {
    console.log('Signed In');
  })
  .catch( (error) =>{
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('Sign in Error', error)
  });
  */
  // google login
  firebase.auth().signInWithPopup(provider).then(function(result) {
    console.log(result)
    localStorage.setItem('user', JSON.stringify(result.user))
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // window.location.assign('test')
    // ...
  }).catch(function(error) {
    console.log(error)
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

export const userLogout = () => {
  firebase
  .auth()
  .signOut()
  .then( () => {
    localStorage.removeItem('user')
    console.log('Signed Out');
  })
  .catch((error) => {
    console.error('Sign Out Error', error);
  });
}


// TODO: Realtime Database
const database = firebase.database().ref();
console.log('this is the realtime database', database)
var users = database.child("users");
// users.push({
//   'name': 'hansi',
//   'company': 'fh'
// })
// console.log(users.ref())


// users.once('value')
//   .then((snap) => {
//     console.log(typeof snap.val())
//     let entries = Object.entries(snap.val())
//     // entries.foreach((item) => {
//     //   console.log(item)
//     // })
//     console.log(entries)
//     // console.log(snap.val())

//   })

// console.log('this is the structure of the database', users.ref())
export const addUserToDatabase = () => {

}

export const getUsers = () => {
  database.once('value')
  .then((snap) => {
    console.log(typeof snap.val())
    let entries = Object.entries(snap.val())
    // entries.foreach((item) => {
    //   console.log(item)
    // })
    console.log(entries)
    return entries
    // console.log(snap.val())

  })
}
