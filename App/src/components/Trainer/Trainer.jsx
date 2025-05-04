import React, { useEffect, useState } from "react";
import "./Trainer.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
const TrainerProfiles = () => {
  const [selected, setSelected] = useState(0);

  //TRAINERS DATA
  const trainers = [
    {
      id: 1,
      name: "Sagar Shrestha",
      specialty: "Strength Training",
      description: "10 years of experience in building strength and endurance.",
      image: "/Trainers/Trainer1.jpg",
      bio: "Sagar is a certified strength coach who has been helping people achieve their fitness goals with personalized training programs. Specializes in powerlifting, bodybuilding, and injury prevention.",
    },

    {
      id: 2,
      name: "Uday Khadka",
      specialty: "Cardio & HIIT",
      description: "Expert in high-intensity workouts and stamina building.",
      image: "/Trainers/Trainer2.jpg",
      bio: "Yuhdean is passionate about helping clients improve cardiovascular health and stamina. He uses HIIT and circuit training to keep workouts exciting and effective.",
    },
  ];
  const tLength = trainers.length;

  useGSAP(() => {
    gsap.from(".trainer-head", {
      y: -20,
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".trainer-profiles",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
    gsap.from(
      ".trainer-ani",
      {
        opacity: 0,
        stagger: 0.3,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".Trainers",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );

    gsap.from(".left-t", {
      duration: 1,
      ease: "power1.inOut",
      opacity: 0,
      x: "-200",
      scrollTrigger: {
        trigger: ".Trainers",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, [selected]);

  return (
    <section className="trainer-profiles">
      <h2 className="trainer-head">
        Meet <span className="our-stroke"> Our</span> Trainers
      </h2>
      <p className="head trainer-head">
        Get to know our certified and passionate trainers
      </p>
      <div className="Trainers">
        <div className="left-t">
          <img src={trainers[selected].image} alt="Trainer Image" />
        </div>
        <div className="right-t">
          <h3 className="trainer-ani" style={{ fontSize: "35px" }}>
            {trainers[selected].name}
          </h3>

          <p className="trainer-ani">
            <strong>Speciality:</strong> {trainers[selected].specialty}
          </p>
          <h4 className="trainer-ani">{trainers[selected].description}</h4>
          <p className="trainer-ani">{trainers[selected].bio}</p>
        </div>
      </div>
      <div
        className="toggles"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <FaArrowLeft
          size={50}
          style={{ cursor: "pointer" }}
          onClick={() => {
            selected === 0
              ? setSelected(tLength - 1)
              : setSelected((prev) => prev - 1);
          }}
        />{" "}
        <FaArrowRight
          style={{ cursor: "pointer" }}
          size={50}
          onClick={() => {
            selected === tLength - 1
              ? setSelected(0)
              : setSelected((prev) => prev + 1);
          }}
        />
      </div>
    </section>
  );
};

export default TrainerProfiles;
