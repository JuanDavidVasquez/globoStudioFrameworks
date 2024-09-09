import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from 'gsap/all';
import './Welcome.css'; // Asegúrate de crear este archivo CSS

gsap.registerPlugin(ScrollTrigger);

export default function Welcome() {
  const welcomeTextRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const welcomeText = Array.from(welcomeTextRef.current.children); 


    gsap.set(welcomeText, { opacity: 0, y: -50 });

   
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      onEnter: () => {
        gsap.to(welcomeText, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "bounce.out",
          stagger: 0.1, 
        });
      },
      onLeaveBack: () => {
        gsap.to(welcomeText, {
          opacity: 0,
          y: -50,
          duration: 1.5,
          stagger: 0.1,
          ease: "expo.out",
        });
      },
    });
  }, []);

  return (
    <div ref={containerRef} className="welcome-container">
      <h1 ref={welcomeTextRef} className="welcome-title">
        {"Welcome to GloboStudio".split("").map((char, index) => (
          <span key={index} className="letter">
            {char === " " ? '\u00A0' : char}
          </span>
        ))}
      </h1>
      <p className="welcome-subtitle">Creating experiences through artistic vision</p>
    </div>
  );
}
