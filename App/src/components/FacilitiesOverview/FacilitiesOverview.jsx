import React from "react";
import "./FacilitiesOverview.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
const FacilitiesOverview = () => {
  const gallery = [
    {
      id: 1,
      img: "/Facilities/Weights.jpg",
      name: "Weights",
    },
    {
      id: 2,
      img: "/Facilities/cardioArea.jpg",
      name: "Cardio Zone",
    },
    {
      id: 3,
      img: "/Facilities/Sauna.jpg",
      name: "Sauna",
    },
    {
      id: 4,
      img: "/Facilities/Lockers.jpg",
      name: "Lockers",
    },
    {
      id: 5,
      img: "/Facilities/SwimmingPool.jpg",
      name: "Swimming Pool",
    },
    {
      id: 6,
      img: "/Facilities/Reception.jpg",
      name: "Reception Area",
    },
  ];

  useGSAP(() => {
    gsap.from(".facilities-head", {
      y: -20,
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".facilities-overview",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
    gsap.from(".video-container", {
      opacity: 0,
      ease: "power1.inOut",
      delay: 0.3,
      scrollTrigger: {
        trigger: ".facilities-head",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });
  return (
    <section className="facilities-overview">
      <h2 className="facilities-head">Our Facilities</h2>
      <p className="facilities-head">
        Explore our state-of-the-art facilities designed to help you reach your
        fitness goals.
      </p>

      {/* Video Section */}
      <div className="video-container">
        <video controls>
          <source src="/Facilities/1027 (5).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="gallery">
        {gallery.map((item) => {
          return (
            <div className="area" key={item.id}>
              
              <img src={item.img} alt={item.name} />
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FacilitiesOverview;
