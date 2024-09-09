import React, { useState, useRef, useEffect } from 'react';
import imagenHeader from '../../assets/img/animateHeader.webp';
import logoPNG from '../../assets/img/logoPNG.png';
import { NavBar } from './NavBar';
import { NavMenu } from './NavMenu';

export const Header = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerImgRef = useRef(null);
  const wrapperRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const headerStyle = {
    backgroundImage: `url(${logoPNG})`,
    backgroundSize: windowWidth <= 400 ? '60%' : '30%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    overflow: 'hidden'
  };

  const handleScroll = () => {
    if (headerImgRef.current) {
      const scrollY = window.scrollY;
      headerImgRef.current.style.transform = `scale(${1 + scrollY / 100})`;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <NavBar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
      <NavMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu} />

      {/* Header */}
      <header style={headerStyle} id='header'>
        <div className="header-content wrapper" ref={wrapperRef}>
          <img
            src={imagenHeader}
            alt="header"
            id="headerImg"
            ref={headerImgRef}
            className="header-img"
          />
        </div>
        <section className="section hero">
          <h1>Globo Studio</h1>
        </section>
      </header>
    </>
  );
};
