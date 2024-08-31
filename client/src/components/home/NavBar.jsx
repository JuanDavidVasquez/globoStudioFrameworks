import React from 'react';
import imgLogin from '../../assets/img/logoPNG.png';
import { NavMenu } from './NavMenu';

export const NavBar = ({ toggleMenu, isMenuOpen, closeMenu }) => {
  return (
    <nav>
      <div className="nav-wrapper">
        <div className="nav-logo">
          <img src={imgLogin} alt="menu" className="menu-icon" />
        </div>
        <div className="content-menu-login">
          <div className="barras" id="barras" onClick={toggleMenu}>
            <div className={`barra barra1 ${isMenuOpen ? 'animar1' : ''}`}></div>
            <div className={`barra barra2 ${isMenuOpen ? 'animar2' : ''}`}></div>
            <div className={`barra barra3 ${isMenuOpen ? 'animar3' : ''}`}></div>
          </div>
        </div>
      </div>
      <NavMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
    </nav>
  );
};
