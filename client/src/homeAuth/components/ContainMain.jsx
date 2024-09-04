import React from 'react'
import useHome from '../../hooks/useHome';
import DashUser from './DashUser';
import CotizarUser from './CotizarUser';
import PointsUser from './PointsUser';

export default function ContainMain() {

  const { menuSidebar } = useHome();



  return (
    <div className='containerContenidoGeneralHomeAuth'>
      {menuSidebar === 'dashboard' && <DashUser/>}
      {menuSidebar === 'puntos' && <PointsUser/>}
      {menuSidebar === 'cotizar' && <CotizarUser/>}
    </div>
  )
}
