import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define

let config = {
  apiKey: 'AIzaSyCYwYxJ-Mmwz47-PpFXtdONtBjUUDR8-7E',
  authDomain: 'mmp2a-85c2b.firebaseapp.com',
  databaseURL: 'https://mmp2a-85c2b.firebaseio.com/',
  projectId: 'mmp2a-85c2b',
  storageBucket: 'mmp2a-85c2b.appspot.com',
  messagingSenderId: '519321050416'
}

// TODO: Authentication
const provider = new firebase.auth.GoogleAuthProvider()
firebase.initializeApp(config)

const callbacks = []

// TODO: StateHandler for before hook Navigo
export async function checkAuthState () {
  firebase.auth().onAuthStateChanged((user) => {
    window.user = user
    console.log('firebase authstate changed fired')
    callbacks.forEach(callback => callback(user))
  })
}

firebase.auth().onAuthStateChanged((user) => {
  window.user = user
  // console.log('firebase authstate changed fired')
  callbacks.forEach(callback => callback(user))

  if(user) {
    addUserToDatabase()
  }
})

export function subscribeToFirebaseAuth (callback) {
  callbacks.push(callback)
}

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
const database = firebase.database().ref()
console.log('this is the realtime database', database)
var users = database.child('users')
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
  return firebase
    .database()
    .ref('users')
    .child(user.uid)
    .set({
      name: user.displayName,
      email: user.email
    })
}

export const getUsers = () => {
  database.child('users').once('value')
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

getUsers()
