import React, { useState, useEffect } from 'react';
import { Header } from '../components/home/Header';
import { About } from '../components/home/About';
import { Service } from '../components/home/Service';
import { Cotiza } from '../components/home/Cotiza';
import { Contact } from '../components/home/Contact';

import image1 from '../assets/img/globo_artistico_1_n.png';
import image2 from '../assets/img/globos_artisticos_2.jpg';
import image3 from '../assets/img/globos_artisticos_3.jpg';
import image4 from '../assets/img/globos_artisticos_4.jpg';
import image5 from '../assets/img/_0.jpg';
import Clientes from '../components/home/Clientes';
import Particles from '../components/home/Particles';

export const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const images = [image1, image2, image3, image4, image5, image1];
  const texts = ['Welcome', 'About', 'Services', 'Clients', 'Crear','Contact'];
  const colors = ['#000000', '#FF4500', '#FF69B4', '#00FF00', 'rgb(195 195 195)', 'rgb(195 195 195)'];

  const handleCloseModal = () => {
    setModalOpen(!modalOpen);
    const btnOpenForm = document.getElementById('btnOpenForm');
    if (modalOpen) {
      btnOpenForm.innerHTML = '<i class="fas fa-chevron-down"></i>';
    } else {
      btnOpenForm.innerHTML = '<i class="fas fa-chevron-up"></i>';
    }
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Manejo de scroll para cambiar imagen del cuadrado y color del texto
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight; 
      const documentHeight = document.documentElement.scrollHeight; 
      const newIndex = Math.min(Math.floor(scrollPosition / (documentHeight / texts.length)), texts.length - 1);
      setImageIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Limpieza del evento
    };
  }, []);

  return (
    <>
      <Header />
      <About />
      <Service />
      <Clientes />
      <Particles />
      <Contact />
      {modalOpen && <Cotiza open={modalOpen} onClose={handleCloseModal} />}
      <button id="btnTop" className="btnTop" onClick={handleClick}>
        <i className="fas fa-arrow-up"></i>
      </button>

      <button id="btnOpenForm" className="btnOpenForm" onClick={handleCloseModal}>
        <i className="fas fa-chevron-down"></i>
      </button>

      {/* Cuadrado que cambia de imagen y texto con color */}
      <div 
        className='square'
        style={{                   
          backgroundImage: `url(${images[imageIndex]})`,
        }}
      >
        <div className='square-text'>
          <h2
            style={{
              color: colors[imageIndex] 
            }}
          >
            {texts[imageIndex]}
          </h2>
        </div>
      </div>
    </>
  );
}
