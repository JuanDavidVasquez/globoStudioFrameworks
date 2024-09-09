import React, { useRef, useEffect } from 'react';
import PointerParticle from '../../hooks/Particles';

export default function Particles() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const pointer = useRef({ x: 0, y: 0, mx: 0, my: 0 });
  const hue = useRef(0);
  const fps = 60;
  const msPerFrame = 1000 / fps;
  const timePrevious = useRef(performance.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const setPointerValues = (event) => {
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
      pointer.current.mx = event.movementX;
      pointer.current.my = event.movementY;
    };

    const createParticles = (event, { count, speed, spread }) => {
      setPointerValues(event);
      for (let i = 0; i < count; i++) {
        particles.current.push(
          new PointerParticle(spread, speed, { ctx, pointer: pointer.current, hue: hue.current })
        );
      }
    };

    const handleParticles = () => {
      for (let i = 0; i < particles.current.length; i++) {
        particles.current[i].update();
        if (particles.current[i].size <= 0.1) {
          particles.current.splice(i, 1);
          i--;
        }
      }
    };

    const animateParticles = () => {
      requestAnimationFrame(animateParticles);

      const timeNow = performance.now();
      const timePassed = timeNow - timePrevious.current;

      if (timePassed < msPerFrame) return;

      const excessTime = timePassed % msPerFrame;
      timePrevious.current = timeNow - excessTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hue.current = hue.current > 360 ? 0 : hue.current + 3;
      handleParticles();
    };

    const getPointerVelocity = (event) => {
      const a = event.movementX;
      const b = event.movementY;
      return Math.floor(Math.sqrt(a * a + b * b));
    };

    const handlePointerMove = (event) => {
      createParticles(event, {
        count: 20,
        speed: getPointerVelocity(event),
        spread: 1,
      });
    };

    const handleClick = (event) => {
      createParticles(event, {
        count: 300,
        speed: Math.random() + 1,
        spread: Math.random() + 50,
      });
    };

    // Añade los event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('click', handleClick);

    // Inicializa las dimensiones del canvas
    handleResize();
    animateParticles();

    // Limpia los event listeners al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('click', handleClick);
    };
  }, []); 

  return (
    <div className='particles'>
        <div className='textParticles'>
            Crea, Inova, <br /> Disfruta
        </div>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', background: '#000', padding: 0 }} />
    </div>
  );
}
