import React, { useEffect, useState } from 'react';
import useHome from '../../hooks/useHome';

export default function SiderBar() {

  const { menuSidebar, setMenuSidebar } = useHome();  
  const [menuRuta, setMenuRuta] = useState('');


  const handleMenu = (ruta) => {
    setMenuRuta(ruta);
    setMenuSidebar(ruta);
  }

  return (
    <aside className='asideBar'>
        <ul>
            <li
            className={` ${menuRuta === 'puntos' ? 'activeSidebar' : ''}`}
             onClick={() => handleMenu('puntos')}>Puntos</li>
            <li
            className={` ${menuRuta === 'dashboard' ? 'activeSidebar' : ''}`}
             onClick={() => handleMenu('dashboard')}>Dashboard</li>
            <li
            className={` ${menuRuta === 'cotizar' ? 'activeSidebar' : ''}`}
             onClick={() => handleMenu('cotizar')}>Cotizar</li>
        </ul>
    </aside>
  );
}
