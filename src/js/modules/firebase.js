import firebase from 'firebase/app'
import 'firebase/auth'
// import 'firebase/database'
import 'firebase/firestore'
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
    console.log('firebase authstate changed fired')
    callbacks.forEach(callback => callback(user))
  })
}

firebase.auth().onAuthStateChanged((user) => {
  callbacks.forEach(callback => callback(user))

  if(user) {
    console.log('User is logged in successful')
    AddUserToFirestore(user.displayName, user.email, '')
    // console.log(userData)
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


// TODO: Firebase Firestore
const db = firebase.firestore()

const AddUserToFirestore = (name, email, nickname) => {
  let checkUser = db.collection('users').doc(email) //.doc(email)
  checkUser
    .get()
    .then(user => {
      if(!user.exists) {
        console.log('User not existing')
        let userData = {
          name: name,
          email: email,
          nickname: nickname,
          answers_last_round: [0,0],
          answers_total: [0,0]
        }
        checkUser.set(userData)
        window.user = userData
      }
      else {
        console.log('User already exists: ', user.data())
        window.user = user.data()
        // test()
        // let questions = ['eins','zwei']
        // let answers = ['a','b']
        // console.log( Object.values(questions))
        // AddNewQuestionsetToFirestore(Object.values(questions), Object.values(answers), window.user.name, 'Sepp')
      }
    })
    .catch(error => {
      console.log('Error: ', error)
    })
}

// TODO: Add a new questionset
export const AddNewQuestionsetToFirestore = (questions, answers, User, Challenger) => {
  console.log('Add new questionset?')
  let qSet = db.collection('questionset')
  qSet.add({
  amountOfQuestions: questions.length,
  questions: questions,
  answers: answers,
  players: [User, Challenger],
  done: false
  })
}

// TODO: get all questionsets for the user
// let test = () => { db.collection('questionset').where("players", 'array-contains', window.user.name).get().then(e => e.forEach(i => console.log(i.data()))) }

// const CheckIfChallenge = () => {

// }



// TODO: update status of Doc whenever local or server changes happen
// db.collection("users").doc(window.user.name)
//     .onSnapshot(function(doc) {
//         var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
//         console.log(source, " data: ", doc.data());
// });
