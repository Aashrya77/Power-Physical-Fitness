import React from 'react';
import './ClassSchedule.css';

const programs = [
  {
    id: 1,
    title: 'HIIT Workout',
    time: 'Monday, Wednesday, Friday - 6:00 AM to 7:00 AM',
    description: 'High-intensity interval training to boost your metabolism and burn fat.',
  },
  {
    id: 2,
    title: 'Zumba',
    time: 'Sunday, Friday - 6:30 AM to 8:30 AM',
    description: 'Relax and strengthen your mind and body with guided yoga sessions.',
  },
  {
    id: 3,
    title: 'Strength Training',
    time: 'Sunday to Friday - 5:00 PM to 8:00 PM',
    description: 'Build muscle and increase strength with targeted exercises and expert coaching.',
  },

];

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { Link } from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);
const ClassSchedule = () => {
  useGSAP(() => {
    gsap.from('.program-head', {
      y: -20,
      opacity: 0,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.class-schedule',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
    gsap.from(".program-card", {
      stagger: .2,
      delay: .2,
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".program-cards",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });
  return (
    <section className="class-schedule">
      <h2 className='program-head'>Our Programs</h2>
      <p className='program-head'>Choose a class that suits your fitness goals and join us at your convenience!</p>
      <div className="program-cards">
        {programs.map((program) => (
          <div key={program.id} className="program-card">
            <h3>{program.title}</h3>
            <p><strong>Time:</strong> {program.time}</p>
            <p>{program.description}</p>
            <Link to='contact'> <button className="program-btn" >Join Now</button></Link>
           
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClassSchedule;
