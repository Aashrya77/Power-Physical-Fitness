import React from 'react';
import './Testimonials.css'; // Import your CSS file

const testimonials = [
  {
    id: 1,
    name: 'Uncle',
    feedback: 'Joining this gym has completely transformed my life! The personal trainers are amazing and have helped me reach my fitness goals.',
    image: '/Testimonials/ClipDown.App_449765671_1457332711818411_1850130915338076061_n.jpg', // Replace with actual images
  },
  { 
    id: 2,
    name: 'Sister',
    feedback: 'The group classes are so much fun! I’ve met a lot of great people, and the energy is incredible. Highly recommend!',
    image: '/Testimonials/SaveIG.App_448367779_3485702245054002_8299980958182675316_n.jpg',
  },
  {
    id: 3,
    name: 'Brother',
    feedback: 'I love the nutrition guidance offered here. It has made a significant difference in my workouts and overall health!',
    image: '/Testimonials/SaveIG.App_448547139_1492958674635406_8122189554199466662_n.jpg',
  },
];
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
const Testimonials = () => {
  useGSAP(() => {
    gsap.from('.testimonials-heading', {
      y: -20,
      opacity: 0,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.testimonials-heading',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
    gsap.from(".testimonial-card", {
      stagger: .2,
      opacity: 0,
      delay: .2,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".testimonial-cards",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });

  return (
    <section className="testimonials-heading">
      <h1 style={{fontSize: '30px', margin: '0'}}>Success Stories</h1>
    <h1> <span className='test-stroke'>WHAT THEY </span> <span>SAY ABOUT US</span></h1> 
      
      <div className="testimonial-cards">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-image">
              <img src={testimonial.image} alt={testimonial.name} />
            </div>
            
            <h3>{testimonial.name}</h3>
            <p>{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
