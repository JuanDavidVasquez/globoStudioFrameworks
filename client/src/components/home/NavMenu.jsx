import React from 'react';

export const NavMenu = ({ isMenuOpen, closeMenu }) => {
  return (
    <div className={`nav-menu ${isMenuOpen ? 'show' : 'hide'}`}>
      <ul className="hamburguesa">
        <li><a href="#header" onClick={closeMenu}>Home</a></li>
        <li><a href="#about" onClick={closeMenu}>About</a></li>
        <li><a href="#services" onClick={closeMenu}>Services</a></li>
        <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
        <li><button onClick={closeMenu}>Login</button></li>
      </ul>
    </div>
  );
};
