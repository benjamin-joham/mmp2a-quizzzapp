import Header from '../components/header'
import { h } from 'jsx-dom'
import Profile from '../components/profile';
import Footer from '../components/footer';
import Impressum from '../components/impressum';


const ProfileScreen = () => {

  return(
    <div id='root'>
      <Header/>
      <main>
      <Profile/>
      </main>
      <Footer/>
    </div>
  )
}

export default ProfileScreen
