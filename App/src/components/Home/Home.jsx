import React, { useEffect, useState } from "react";
import "./Home.css";
import NumberCounter from "number-counter";
import { motion } from "framer-motion";
import { Link, Outlet } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Home = () => {
  const transition = { type: "spring", duration: 3 };
  useGSAP(() => {
    gsap.from(".home-ani", {
      duration: 1,
      opacity: 0,
      ease: "power1.inOut",
      stagger: 0.2,
    });
  });

  return (
    <>
      <section className="hero">
        <video
          className="background-video"
          poster="\Home\BackgroundSagar.jpg"
          autoPlay
          muted
          loop
          preload="metadata"
        >
          <source src="\Home\1028.mp4" type="" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>

        <div className="hero-content">
         
          <h1 className="home-ani">
            Where <span className="stroke-tex">Fitness</span> Meets Power
          </h1>
          <p style={{ fontSize: "18px" }} className="home-ani">
            Start your journey with us and discover how powerful you can become.
            We offer more than a workout; we offer a lifestyle.
          </p>
          <div className="stats home-ani">
            <div className="coaches">
              <h4>
                <NumberCounter end={2} start={0} delay="1" preFix="+" />
              </h4>
              <p>Expert Coaches</p>
            </div>
            <div className="members">
              <h4>
                <NumberCounter end={200} start={100} delay="3" preFix="+" />
              </h4>
              <p>Members Joined</p>
            </div>
          </div>
          <Link to="plans">
            {" "}
            <button className="hero-btn">Get Started</button>
          </Link>
        </div>
      </section>
      <Outlet />
    </>
  );
};

export default Home;
