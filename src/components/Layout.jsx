import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function Layout() {
  return (
    <div>
      <NavBar/>
      <div className='min-h-[80vh]'>
      <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default Layout