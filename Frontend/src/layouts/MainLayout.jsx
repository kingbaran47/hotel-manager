import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from '../components/Header.jsx'
const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header className='h-16'/>
        <main className='flex-grow'>
            <Outlet/>
        </main>
        



    </div>
  )
}

export default MainLayout;