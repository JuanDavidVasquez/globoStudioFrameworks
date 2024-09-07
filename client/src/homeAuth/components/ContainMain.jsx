import React from 'react'
import useHome from '../../hooks/useHome';
import DashUser from './DashUser';
import CotizarUser from './CotizarUser';
import Users from './admin/Users';

export default function ContainMain() {

  const { menuSidebar } = useHome();



  return (
    <div className='containerContenidoGeneralHomeAuth'>
      {menuSidebar === 'dashboard' && <DashUser/>}
      {menuSidebar === 'users' && <Users/>}
      {menuSidebar === 'cotizar' && <CotizarUser/>}
    </div>
  )
}
