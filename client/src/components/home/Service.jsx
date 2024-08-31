import React, { useRef, useEffect, useState } from 'react';
import Balloon from '../../hooks/Balloon';

export const Service = () => {
  const balloonRef = useRef(null);
  const servicesRef = useRef([]);
  const [balloonsService, setBalloonsService] = useState([]);
  
  useEffect(() => {
    const balloon = balloonRef.current;
    const services = servicesRef.current;

    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    const handleMouseDown = (e) => {
      isDragging = true;
      offsetX = e.clientX - balloon.offsetLeft;
      offsetY = e.clientY - balloon.offsetTop;
      balloon.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        balloon.style.left = `${e.clientX - offsetX}px`;
        balloon.style.top = `${e.clientY - offsetY}px`;

        services.forEach(service => {
          const serviceRect = service.getBoundingClientRect();
          const balloonRect = balloon.getBoundingClientRect();

          const canvas = service.querySelector('.balloon-service-canvas');

          if (
            balloonRect.left < serviceRect.right &&
            balloonRect.right > serviceRect.left &&
            balloonRect.top < serviceRect.bottom &&
            balloonRect.bottom > serviceRect.top
          ) {
            service.classList.add('hovered');
            if (!canvas) {
              const newCanvas = document.createElement('canvas');
              newCanvas.className = 'balloon-service-canvas';
              newCanvas.width = service.offsetWidth;
              newCanvas.height = service.offsetHeight;
              service.appendChild(newCanvas);

              const ctx = newCanvas.getContext('2d');
              const newBalloons = [];
              const numberOfBalloonsService = 100;

              // Crear múltiples globos
              for (let i = 0; i < numberOfBalloonsService; i++) {
                newBalloons.push(new Balloon(newCanvas));
              }
              setBalloonsService(newBalloons);

              const animateServices = () => {
                ctx.clearRect(0, 0, newCanvas.width, newCanvas.height);
                newBalloons.forEach(balloon => {
                  balloon.updatePosition();
                  balloon.drawBalloon();
                });
                requestAnimationFrame(animateServices);
              };

              animateServices();
            }
          } else {
            service.classList.remove('hovered');
            if (canvas) {
              canvas.remove();
            }
          }
        });
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      balloon.style.cursor = 'grab';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    balloon.addEventListener('mousedown', handleMouseDown);

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      balloon.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <section className="section services" id="services">
      <h2>Services</h2>
      <div className="services-content">
        <div className="service" ref={el => servicesRef.current[0] = el}>
          <h3>Service 1</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
        </div>
        <div className="service" ref={el => servicesRef.current[1] = el}>
          <h3>Service 2</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
        </div>
        <div className="service" ref={el => servicesRef.current[2] = el}>
          <h3>Service 3</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
        </div>
      </div>
      <div
        className="services-img"
        id="balloonDraggable"
        ref={balloonRef}
        style={{ position: 'absolute', cursor: 'grab' }}
      >
        {/* El globo se colocará aquí */}
      </div>
    </section>
  );
};
