import React, { useEffect, useRef } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "../PageNotFound.css";

export default function PageNotFound() {
  const leftPupil = useRef(null);
  const rightPupil = useRef(null);

  // Animate pupils with mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      const moveEye = (eye, pupil) => {
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const dx = e.clientX - eyeCenterX;
        const dy = e.clientY - eyeCenterY;

        const angle = Math.atan2(dy, dx);
        const radius = 30;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        pupil.style.transform = `translate(${x}px, ${y}px)`;
      };

      moveEye(leftPupil.current.parentElement, leftPupil.current);
      moveEye(rightPupil.current.parentElement, rightPupil.current);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Load particle engine
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="not-found-container">
      {/* ✨ Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: -1 },
          background: { color: "#0f172a" },
          particles: {
            number: { value: 80, density: { enable: true, area: 800 } },
            color: { value: "#a855f7" },
            links: {
              enable: true,
              distance: 150,
              color: "#a855f7",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.6,
              direction: "none",
              outModes: "bounce",
            },
            shape: { type: "circle" },
            opacity: {
              value: 0.7,
              random: true,
              anim: { enable: true, speed: 0.5, opacity_min: 0.2, sync: false },
            },
            size: {
              value: 3,
              random: true,
              anim: { enable: false },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
              onClick: { enable: true, mode: "repulse" },
            },
            modes: {
              grab: { distance: 150, line_linked: { opacity: 0.5 } },
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          retina_detect: true,
        }}
      />

      {/* Eyes */}
      <div className="eyes-container">
        <div className="eye">
          <div className="pupil" ref={leftPupil}></div>
        </div>
        <div className="eye">
          <div className="pupil" ref={rightPupil}></div>
        </div>
      </div>

      <h1 className="error-text">404, Page Not Found.</h1>
      <button className="home-btn">Please Take Me Home</button>
    </div>
  );
}
