import AppNav from './AppNav'
import styles from './Sidebar.module.css'
import Logo from '../components/Logo'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav/>

      <Outlet/>

      <Footer/>
    </div>
  )
}

export default SideBar
