import React from 'react';
import { Link } from 'react-router-dom';

export const NavMenu = ({ isMenuOpen, closeMenu }) => {
  return (
    <div className={`nav-menu ${isMenuOpen ? 'show' : 'hide'}`}>
      <ul className="hamburguesa">
        <li><a href="#header" onClick={closeMenu}>Home</a></li>
        <li><a href="#about" onClick={closeMenu}>About</a></li>
        <li><a href="#services" onClick={closeMenu}>Services</a></li>
        <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
        <li><Link to={'/login'} onClick={closeMenu}>Login</Link></li>
        <li><Link to={'/register'} onClick={closeMenu}>Register</Link></li>
      </ul>
    </div>
  );
};
