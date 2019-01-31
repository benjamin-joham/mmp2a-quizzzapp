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
export let allQuestionSets


// TODO: StateHandler for before hook Navigo
export async function checkAuthState () {
  firebase.auth().onAuthStateChanged((user) => {
    window.user = user
    console.log('firebase authstate changed fired')
    callbacks.forEach(callback => callback(user))
  })
}

firebase.auth().onAuthStateChanged(async (user) => {
  window.user = user
  callbacks.forEach(callback => callback(user))

  if(user) {
    console.log('User is logged in successful')
    GetAllUsers()
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
        allQuestionSets = GetQuestionsets(window.user.name)
      }
      else {
        console.log('User already exists: ', user.data())
        window.user = user.data()
        GetQuestionsets(window.user.name)
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
export const AddNewQuestionsetToFirestore = (questions, answers, User, Challenger, userPoints) => {
  console.log('Add new questionset?')
  let qSet = db.collection('questionset')
  qSet.add({
  amountOfQuestions: questions.length,
  questions: questions,
  answers: {
    correct: [answers[0]],
    wrong: [answers[1], answers[2], answers[3]]
  },
  players: [User, Challenger],
  done: false,
  points: [userPoints, 0]
  })
}

// TODO: get all questionsets for the user
const GetQuestionsets = (name) => {
  let response = []
  let result = []
  db.collection('questionset')
    .where("players", 'array-contains', name)
    .get()
    .then( (e) => {
      e.forEach((i) => {
        response.push(i.data())
      })
      console.log('questionssets:' ,response)
      console.log(response.forEach(i => result.push(i)))
      allQuestionSets = result
    })
    .catch(err => console.log(err))
}

export const GetAllUsers = () => {
  return new Promise((resolve, reject) => {
    let allUsers = []
    db.collection('users')
      .get()
      .then( snapshot => {
        snapshot.forEach(user => {
          allUsers.push(user.data().name)
        })
        console.log('Challenger: ',allUsers)
        resolve(allUsers)
      })
  })
}

// Update scores of SinglePlayer
export const UpdateScoresOfSP = (name, total, correct) => {
  let update = db.collection('users').doc(name)
  let total_total
  let correct_total
  update
    .get()
    .then(data => {
      total_total = data.data().answers_total[0] + total
      correct_total = data.data().answers_total[1] + correct
      console.log('total ', total_total)
      console.log('correct ', correct_total)
      update.update({
          answers_last_round: [total, correct],
          answers_total: [total_total, correct_total]
      })
    })
    .catch(err => console.log('Can not update Score - ', err))
}


// TODO: update status of Doc whenever local or server changes happen
db.collection("users").doc('benjamin.joham@gmail.com')
    .onSnapshot(function(doc) {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source, " data: ", doc.data());
        if(window.user){
        }
});
