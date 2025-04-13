import React, { useState } from "react";
import ServiceModal from "./ServiceModal";
import { FaDumbbell, FaUsers, FaAppleAlt } from "react-icons/fa"; // Example icons
import "./Services.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState({});

  const services = [
    {
      id: 1,
      title: "Personal Training",
      description:
        "One-on-one sessions with expert coaches tailored to your individual fitness goals. Get personalized workout plans, nutrition advice, and constant motivation.",
      icon: <FaDumbbell size={40} color="cornFlowerBlue" />,
    },
    {
      id: 2,
      title: "Group Classes",
      description:
        "Join our high-energy group classes, including yoga, spin, and circuit training. Enjoy the camaraderie of working out together while staying motivated.",
      icon: <FaUsers size={40} color="cornFlowerBlue" />,
    },
    {
      id: 3,
      title: "Nutrition Guidance",
      description:
        "Our nutritionists provide customized diet plans to complement your workout routine, ensuring you get the results you desire. Learn about meal prep and healthy eating habits.",
      icon: <FaAppleAlt size={40} color="cornFlowerBlue" />,
    },
  ];

  const handleLearnMore = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  useGSAP(() => {
    gsap.from('.services-header', {
      y: -20,
      opacity: 0,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.services',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
    gsap.from(".service-card", {
      stagger: .2,
      opacity: 0,
      delay: .2,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".services-list",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });

  return (
    <section className="services" id="services">
      <div className="services-header">
        <h1>Our Services</h1>
        <p>
          Discover the range of services we offer to help you achieve your
          fitness goals.
        </p>
      </div>

      <div className="services-list">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description.slice(0, 35)}...</p>
            <button onClick={() => handleLearnMore(service)}>Learn More</button>
          </div>
        ))}
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceDetails={selectedService}
      />
    </section>
  );
};

export default Services;
