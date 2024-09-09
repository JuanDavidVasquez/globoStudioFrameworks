import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis'; // Asegúrate de tener esta librería instalada
import ScrollMagic from 'scrollmagic'; // Instala ScrollMagic si aún no lo tienes
import './client.css';

export default function Clientes() {
  const loaderVideoRef = useRef(null); // Referencia para el video del loader

  // Smooth Scroll usando Lenis
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy(); // Limpia el efecto al desmontar
  }, []);

  // Scroll Button Animation
  useEffect(() => {
    const handleScroll = () => {
      const box = document.querySelector('.scrollBtn');
      if (window.scrollY > 0) {
        box.classList.add('move');
      } else {
        box.classList.remove('move');
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll); // Limpieza del evento
  }, []);

  // Preloader Text Animation
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    const firstText = document.getElementById('first-text');
    const secondText = document.getElementById('second-text');

    firstText.style.opacity = '1';
    setTimeout(() => {
      firstText.style.opacity = '0';
      secondText.style.opacity = '1';
    }, 1000);

    setTimeout(() => {
      preloader.style.display = 'none';
    }, 4000);
  }, []);

  // Loader Video
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    document.documentElement.classList.add('overflow-hidden');

    setTimeout(() => {
      const loaderVideo = loaderVideoRef.current;
      loaderVideo.style.width = '90%';
      loaderVideo.style.height = '90%';
      loaderVideo.style.transform = 'translate(-50%, -50%)';
      loaderVideo.style.position = 'fixed';
      loaderVideo.style.top = '50%';
      loaderVideo.style.left = '50%';
      loaderVideo.style.borderRadius = '12px';

      document.body.classList.remove('overflow-hidden');
      document.documentElement.classList.remove('overflow-hidden');
    }, 3000);
  }, []);

  // ScrollMagic Pinning
  useEffect(() => {
    const controller = new ScrollMagic.Controller({ loglevel: 3 });

    new ScrollMagic.Scene({
      triggerElement: "#section2",
      triggerHook: "onEnter",
      duration: "100%"
    }).setPin("#section1 .pinWrapper", { pushFollowers: false }).addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: "#section2",
      triggerHook: "onEnter",
      duration: "200%"
    }).setPin("#section2 .pinWrapper", { pushFollowers: false }).addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: "#section3",
      triggerHook: "onEnter",
      duration: "200%"
    }).setPin("#section3 .pinWrapper", { pushFollowers: false }).addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: "#section4",
      triggerHook: "onEnter",
      duration: "100%"
    }).setPin("#section4 .pinWrapper", { pushFollowers: false }).addTo(controller);

    return () => controller.destroy(); // Limpia el controlador al desmontar
  }, []);

  return (
    <div>
      <section className="events-page">
        <div id="section1" className="event">
          <div className="pinWrapper">
            <div className="text">
              <h2>Living</h2>
              <p>Explore our range of stylish and comfortable living room furniture.</p>
            </div>
            <div className="image" id="loaderVideo" ref={loaderVideoRef}>
              <video autoPlay loop muted playsInline>
                <source src="https://www.yudiz.com/codepen/studio-r/bg-video.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="scrollBtn">
            <h6>scroll</h6>
            <span></span>
          </div>
        </div>

        <div id="section2" className="event">
          <div className="pinWrapper">
            <div className="text">
              <h2>Kitchen</h2>
              <p>Check out our modern and functional kitchen furniture and accessories.</p>
            </div>
            <div className="image"></div>
          </div>
        </div>

        <div id="section3" className="event">
          <div className="pinWrapper">
            <div className="text">
              <h2>Bedroom</h2>
              <p>Discover our collection of bedroom furniture to create your dream space.</p>
            </div>
            <div className="image"></div>
          </div>
        </div>

        <div id="section4" className="event">
          <div className="pinWrapper">
            <div className="text">
              <h2>Office</h2>
              <p>Find the perfect office furniture to make your workspace comfortable and productive.</p>
            </div>
            <div className="image"></div>
          </div>
        </div>
      </section>

      <div id="preloader">
        <div className="text-wrapper">
          <h1 id="first-text">Studio R</h1>
          <h3 id="second-text">Creative Agency</h3>
        </div>
      </div>
    </div>
  );
}
