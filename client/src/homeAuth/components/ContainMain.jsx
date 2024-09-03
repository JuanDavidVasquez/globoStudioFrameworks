import React from 'react'
import useHome from '../../hooks/useHome';
import DashUser from './DashUser';
import ProyectsUser from './ProyectsUser';
import CotizarUser from './CotizarUser';

export default function ContainMain() {

  const { menuSidebar } = useHome();



  return (
    <div>
      {menuSidebar === 'dashboard' && <DashUser/>}
      {menuSidebar === 'proyectos' && <ProyectsUser/>}
      {menuSidebar === 'cotizar' && <CotizarUser/>}
    </div>
  )
}
