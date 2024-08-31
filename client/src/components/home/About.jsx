import React, { useEffect, useRef } from 'react';
import Balloon from '../../hooks/Balloon';

export const About = () => {
  const balloonCanvasRef = useRef(null);
  const balloons = useRef([]);

  useEffect(() => {
    const balloonCanvas = balloonCanvasRef.current;
    if (!balloonCanvas) return;

    // Inicializar los globos
    for (let i = 0; i < 10; i++) {
      balloons.current.push(new Balloon(balloonCanvas));
    }

    const animate = () => {
      const ctx = balloonCanvas.getContext('2d');
      ctx.clearRect(0, 0, balloonCanvas.width, balloonCanvas.height); // Limpiar el canvas

      // Actualizar y dibujar cada globo
      balloons.current.forEach(balloon => {
        balloon.updatePosition();
        balloon.drawBalloon();
      });

      requestAnimationFrame(animate); // Repetir animación
    };

    animate(); // Iniciar animación

    // Limpiar globos al desmontar el componente
    return () => {
      balloons.current = [];
    };
  }, []);

  return (
    <section className="section about" id="about">
      <h2>About</h2>
      <p className="textAbout">
        Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum
        dolor sit amet consectetur adipisicing elit
      </p>
      <canvas id="balloonCanvas" ref={balloonCanvasRef}></canvas>
    </section>
  );
};
