import Header from '../components/header'
import { h } from 'jsx-dom'
import Profile from '../components/profile';


const ProfileScreen = () => {

  return(
    <div id='root'>
      <Header/>
      <main>
      <Profile/>
      </main>
    </div>
  )
}

export default ProfileScreen
