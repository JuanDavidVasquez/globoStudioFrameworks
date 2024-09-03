import React, { useEffect, useState } from 'react'
import '../homeAuth/homeAuth.css'
import SiderBar from '../homeAuth/components/SiderBar'
import ContainMain from '../homeAuth/components/ContainMain'
import useHome from '../hooks/useHome'

export const HomeAuth = () => {


    const { menuSidebar } = useHome();

    useEffect(() => {
        console.log('home', menuSidebar)
    }, [])

    

  return (
    <main className='main-container-auth'>
    <h1>My Globo Studiuo {menuSidebar}</h1>
        <SiderBar/>
        <ContainMain/>
    </main>
  )
}

