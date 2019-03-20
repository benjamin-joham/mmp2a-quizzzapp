import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { h } from 'jsx-dom' // eslint-disable-line no-use-before-define

let config = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'mmp2a-85c2b.firebaseapp.com',
  databaseURL: 'https://mmp2a-85c2b.firebaseio.com/',
  projectId: 'mmp2a-85c2b',
  storageBucket: 'mmp2a-85c2b.appspot.com',
  messagingSenderId: '519321050416'
}

const provider = new firebase.auth.GoogleAuthProvider()
firebase.initializeApp(config)

const callbacks = []
export let allQuestionSets

export async function checkAuthState () {
  firebase.auth().onAuthStateChanged((user) => {
    window.user = user
    callbacks.forEach(callback => callback(user))
  })
}

firebase.auth().onAuthStateChanged(async (user) => {
  window.user = user
  callbacks.forEach(callback => callback(user))

  if (user) {
    GetAllUsers()
    AddUserToFirestore(user.displayName, user.email, '')
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

const db = firebase.firestore()

const AddUserToFirestore = (name, email, nickname) => {
  let checkUser = db.collection('users').doc(email)
  checkUser
    .get()
    .then(user => {
      if (!user.exists) {
        let userData = {
          name: name,
          email: email,
          nickname: nickname,
          answers_last_round: [0, 0],
          answers_total: [0, 0]
        }
        checkUser.set(userData)
        window.user = userData
        allQuestionSets = GetQuestionsets(window.user.name)
      } else {
        window.user = user.data()
        allQuestionSets = GetQuestionsets(window.user.name)
      }
    })
    .catch(error => {
      console.log('Error: ', error)
    })
}

export const AddNewQuestionsetToFirestore = async (data, User, Challenger, userPoints) => {
  return new Promise((resolve, reject) => {
    let qSet = db.collection('questionset')
    qSet.add({
      amountOfQuestions: Object.values(data).length,
      q_a_total: data,
      players: [User, Challenger],
      done: false,
      points: [userPoints, 0],
      challenged_on: new Date().getTime()
    })
      .then(() => {
        resolve(Challenger + ' has been challenged')
      })
      .catch(err => {
        console.log('error', err)
        reject('Challenge failed')
      })
  })
}

const GetQuestionsets = (name) => {
  let response = []
  let id = []
  let result = []
  db.collection('questionset')
    .where('players', 'array-contains', name)
    .get()
    .then((e) => {
      e.forEach((i) => {
        response.push(i.data())
        id.push(i.id)
      })

      allQuestionSets = {
        id: id,
        data: result
      }
    })
    .catch(err => console.log(err))
}

export const GetAllUsers = () => {
  return new Promise((resolve, reject) => {
    let allUsers = []
    db.collection('users')
      .get()
      .then(snapshot => {
        snapshot.forEach(user => {
          allUsers.push(user.data().name)
        })
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
      update.update({
        answers_last_round: [total, correct],
        answers_total: [total_total, correct_total]
      })
    })
    .catch(err => console.log('Can not update Score - ', err))
}
// Update scores of SinglePlayer
export const UpdateScoresOfChallenge = (id, pointsOld, pointsNew) => {
  let update = db.collection('questionset').doc(id)
  update
    .update({
      done: true,
      points: [pointsOld, pointsNew]
    })
}

// TODO: update status of Doc
export const updateFirestore = async () => {
  let response = []
  let id = []
  let result = []
  if (window.user) {
    return new Promise((resolve, reject) => {
      db.collection('users').doc(window.user.email)
        .get()
        .then(doc => {
          if (window.user) {
            window.user = doc.data()
          }
        })

      db.collection('questionset')
        .where('players', 'array-contains', window.user.name)
        .get()
        .then((e) => {
          e.forEach((i) => {
            response.push(i.data())
            id.push(i.id)
          })
          allQuestionSets = {
            id: id,
            data: result
          }
        })
        .catch(err => console.log(err))
      resolve('updated')
    })
  }
}
