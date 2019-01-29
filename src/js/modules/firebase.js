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

const callbacks = []

firebase.auth().onAuthStateChanged((user) => {
  window.user = user
  callbacks.forEach(callback => callback(user))
})

export function subscribeToFirebaseAuth(callback) {
  callbacks.push(callback)
}

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     // User is signed in.
//     // if(window.user != user) { window.user = user }
//     console.log(user);
//     window.location.reload

//     // var isAnonymous = user.isAnonymous;
//     // var uid = user.uid;
//     // ...
//   } else {
//     // User is signed out.
//     console.log('not logged in right now')
//     // ...
//   }
//   // ...
// });

export const userLogin = async () => {
  // google login
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(response => response)
    .catch(error => error)
}

export const userLogout = async () => {
  return firebase
  .auth()
  .signOut()
  .then(response => response)
  .catch(error => error)
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
