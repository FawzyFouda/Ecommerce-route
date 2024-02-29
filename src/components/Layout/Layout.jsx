import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Style from  './Layout.module.css'
import { Offline, Online } from 'react-detect-offline'

function Layout() {
  return (
    <>
        <div>
            
            <Navbar/>
            <Outlet/>
            <Offline>Only shown when you are offline</Offline>
        </div>
    </>
  )
}

export default Layout