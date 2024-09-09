import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import ScrollMagic from "scrollmagic";
import "./client.css";

export default function Clientes() {
  const loaderVideoRef = useRef(null);
  const containerRef = useRef(null);

  // Scroll Button Animation
  useEffect(() => {
    const handleScroll = () => {
      const box = document.querySelector(".scrollBtn");
      if (box) {
        if (window.scrollY > 0) {
          box.classList.add("move");
        } else {
          box.classList.remove("move");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll); // Limpieza del evento
  }, []);

  // Preloader Text Animation
  useEffect(() => {
    const preloader = document.getElementById("preloader");
    const firstText = document.getElementById("first-text");
    const secondText = document.getElementById("second-text");

    if (firstText && secondText) {
      firstText.style.opacity = "1";
      setTimeout(() => {
        firstText.style.opacity = "0";
        secondText.style.opacity = "1";
      }, 100);

      setTimeout(() => {
        if (preloader) {
          preloader.style.display = "none";
        }
      }, 400);
    }
  }, []);

  // Loader Video
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    document.documentElement.classList.add("overflow-hidden");

    setTimeout(() => {
      const loaderVideo = loaderVideoRef.current;
      if (loaderVideo) {
        loaderVideo.style.width = "90%";
        loaderVideo.style.height = "90%";
        loaderVideo.style.transform = "translate(-50%, -50%)";
        loaderVideo.style.position = "fixed";
        loaderVideo.style.top = "50%";
        loaderVideo.style.left = "50%";
        loaderVideo.style.borderRadius = "12px";
      }

      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    }, 100);
  }, []);

  // ScrollMagic Pinning
  useEffect(() => {
    const controller = new ScrollMagic.Controller({ loglevel: 3 });

    const scenes = [
      { id: "section1", duration: "100%" },
      { id: "section2", duration: "200%" },
      { id: "section3", duration: "200%" },
      { id: "section4", duration: "100%" },
    ];

    scenes.forEach((scene) => {
      new ScrollMagic.Scene({
        triggerElement: `#${scene.id}`,
        triggerHook: "onEnter",
        duration: scene.duration,
      })
        .setPin(`#${scene.id} .pinWrapper`, { pushFollowers: false })
        .addTo(controller);
    });

    return () => controller.destroy(); // Limpia el controlador al desmontar
  }, []);

  return (
    <div ref={containerRef} className="container">
      <section className="events-page">
        <div id="section1" className="event">
          <div className="pinWrapper">
            <div className="text glass-effect">
              <h2> – Ana M.</h2>
              <p>
                "GloboStudio transformó nuestra celebración en una experiencia
                mágica. Los globos eran tan artísticos y únicos, ¡todos quedaron
                impresionados!."
              </p>
            </div>
            <div className="image"></div>
          </div>
        </div>

        <div id="section2" className="event">
          <div className="pinWrapper">
            <div className="text glass-effect">
              <h2>– Carlos R</h2>
              <p>
                "El equipo de GloboStudio superó nuestras expectativas con sus
                diseños creativos. Cada detalle fue perfecto y hizo que nuestra
                fiesta fuera inolvidable." 
              </p>
            </div>
            <div className="image"></div>
          </div>
        </div>

        <div id="section3" className="event">
          <div className="pinWrapper">
            <div className="text glass-effect">
              <h2> – Mariana G</h2>
              <p>
                "Los globos de GloboStudio añadieron un toque especial a nuestro
                evento. La calidad y el diseño fueron excepcionales. ¡Altamente
                recomendados!."
              </p>
            </div>
            <div className="image"></div>
          </div>
        </div>

        <div id="section4" className="event">
          <div className="pinWrapper">
            <div className="text glass-effect">
              <h2>– Luis F</h2>
              <p>
                "Estoy encantado con el trabajo de GloboStudio. Sus creaciones
                no solo son hermosas, sino que también son muy profesionales y
                atendieron cada uno de nuestros deseos."
              </p>
            </div>
            <div className="image"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
