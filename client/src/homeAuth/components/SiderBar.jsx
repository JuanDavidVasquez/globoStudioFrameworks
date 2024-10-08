import React, { useEffect, useState } from 'react';
import useHome from '../../hooks/useHome';
import PointsUser from './PointsUser';
import useAuth from '../../hooks/useAuth';

export default function SiderBar() {

  const { menuSidebar, setMenuSidebar } = useHome();  
  const [menuRuta, setMenuRuta] = useState('');
  const { auth } = useAuth();


  const handleMenu = (ruta) => {
    setMenuRuta(ruta);
    setMenuSidebar(ruta);
  }

  return (
    <aside className='asideBar'>
        <ul>
        <li className='asideBar-points'>
        <PointsUser/>
        </li>
            <li
            className={` ${menuRuta === 'dashboard' ? 'activeSidebar' : ''}`}
             onClick={() => handleMenu('dashboard')}>Dashboard</li>
            <li
            className={` ${menuRuta === 'cotizar' ? 'activeSidebar' : ''}`}
             onClick={() => handleMenu('cotizar')}>Cotizar</li>
        </ul>
        { auth.role === 'admin' && 
          <ul>
          <li className='asidebar-admin'>Admin</li>
          <li
          className={` ${menuRuta === 'users' ? 'activeSidebar' : ''}`}
          onClick={() => handleMenu('users')}
          >Users</li>
          <li
          className={` ${menuRuta === 'categories' ? 'activeSidebar' : ''}`}
          onClick={() => handleMenu('categories')}
          >Categories</li>
          <li
          className={` ${menuRuta === 'products' ? 'activeSidebar' : ''}`}
          onClick={() => handleMenu('products')}
          >Products</li>
          <li
          className={` ${menuRuta === 'orders' ? 'activeSidebar' : ''}`}
          onClick={() => handleMenu('orders')}
          >Orders</li>
        </ul>
        }
    </aside>
  );
}
