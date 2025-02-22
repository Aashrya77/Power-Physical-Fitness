import React from "react";
import "./Intro.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger)
const Intro = () => {
  useGSAP(() => {
    gsap.from(".in-ani", {
      opacity: 0,
      duration: 1,
      ease: "power1.inOut",
      stagger: '.2',
      
      scrollTrigger: {
        trigger: ".introduction-section",
        start: "top 80%",
        toggleActions: "play none none none",
        
      },
    });
    gsap.from(".intro-image", {
      duration: 1,
      ease: "back.out",
      scale: 1.1,
      scrollTrigger: {
        trigger: ".intro-content",
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  });
  return (
    <section className="introduction-section" id="about">
      <div className="intro-content in-ani">
        <h2>Welcome to Power Physical Fitness</h2>
        <p>
          At Power Physical Fitness, we provide personalized training programs
          tailored to fit your needs. Our expert trainers, modern equipment, and
          vibrant community make us the best choice for fitness enthusiasts
          looking to improve their health, strength, and lifestyle.
        </p>
        <p>Join us and experience a fitness journey like no other!</p>
      </div>
      <div className="intro-image in-ani">
        <img
          src="\Facilities\Reception.jpg"
          alt="Power Fitness Gym"
        />
      </div>
    </section>
  );
};

export default Intro;
