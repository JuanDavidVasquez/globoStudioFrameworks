import React, { useEffect, useState } from 'react'
import '../homeAuth/homeAuth.css'
import SiderBar from '../homeAuth/components/SiderBar'
import ContainMain from '../homeAuth/components/ContainMain'
import useHome from '../hooks/useHome'
import useAuth from '../hooks/useAuth'
import Logout from '../homeAuth/components/Logout'

export const HomeAuth = () => {


    const { menuSidebar } = useHome();
    const { auth } = useAuth();

    useEffect(() => {
        console.log('home', menuSidebar)
    }, [])

    console.log('auth', auth)

  return (
    <main className='main-container-auth'>
    <h1 className='headerAuth'>My Globo Studio <div className='logoutHome'><span>{auth.nombre}</span> <Logout/></div></h1>
        <SiderBar/>
        <ContainMain/>
    </main>
  )
}

