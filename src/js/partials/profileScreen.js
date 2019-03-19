import Header from '../components/header'
import Profile from '../components/profile'
import Footer from '../components/footer'

const ProfileScreen = () => {
  return (
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
