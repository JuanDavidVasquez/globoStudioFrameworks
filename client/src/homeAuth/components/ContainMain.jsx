import React from 'react'
import useHome from '../../hooks/useHome';
import DashUser from './DashUser';
import CotizarUser from './CotizarUser';
import Users from './admin/Users';
import { Categories } from '../../pages/Categories';
import Products from '../../pages/Products';
import Orders from '../../pages/Orders';

export default function ContainMain() {

  const { menuSidebar } = useHome();



  return (
    <div className='containerContenidoGeneralHomeAuth'>
      {menuSidebar === 'dashboard' && <DashUser/>}
      {menuSidebar === 'users' && <Users/>}
      {menuSidebar === 'cotizar' && <CotizarUser/>}
      {menuSidebar === 'categories' && <Categories/>}
      {menuSidebar === 'products' && <Products/>}
      {menuSidebar === 'orders' && <Orders/>}
    </div>
  )
}
