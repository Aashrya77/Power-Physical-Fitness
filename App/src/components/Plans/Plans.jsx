import React from "react";
import "./Plans.css";
import { FaHeartCircleBolt } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { LuCrown } from "react-icons/lu";
import { MdWorkspacePremium } from "react-icons/md";
import gsap from 'gsap'
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useNavigate } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger)

const Plan = ({ icon, title, price, benefits, isPremium }) =>{
  const navigate = useNavigate();  // Initialize navigate

  const handleJoinNow = (planName) => {
    navigate(`/plans/${planName}`);  // Navigate to the specific plan page
  };
  return (
    <div className={`plan ${isPremium ? "premium" : ""}`}>
      {icon}
      <h4>{title} Plan</h4>
      <h1>Rs. {price}/month</h1>
      <ul>
        {benefits.map((benefit, index) => (
          <li key={index}>
            <FaCircleCheck /> {benefit}
          </li>
        ))}
      </ul>
      <button className={`plan-btn ${isPremium ? "premium-btn" : ""}`} onClick={() => handleJoinNow(title)}>
        Join Now
      </button>
    </div>
  )
} ;

const Plans = () => {
  useGSAP(() => {
    gsap.from('.heading', {
      y: -20,
      opacity: 0,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.plans',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
    gsap.from('.plan', {
      delay: .3,
      stagger: .3,
      opacity: 0,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.plans',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
  })
  const planData = [
    {
      icon: <FaHeartCircleBolt style={{ fontSize: "2rem", color: "cornflowerblue" }} />,
      title: "Basic",
      price: 3000,
      benefits: ["Access to gym", "Personal trainer support", "Weekly check-ins"],
      isPremium: false,
    },
    {
      icon: <LuCrown style={{ fontSize: "2rem", color: "white" }} />,
      title: "Premium",
      price: 3500,
      benefits: ["All Basic Plan benefits", "Priority Support", "Shower"],
      isPremium: true,
    },
    {
      icon: <MdWorkspacePremium style={{ fontSize: "2rem", color: "cornflowerblue" }} />,
      title: "Advanced",
      price: 5000,
      benefits: ["All Premium benefits", "Steam/Sauna", "Supplement recommendations"],
      isPremium: false,
    },
  ];

  return (
    <div className="plans" id="plans">
      <h1 className="heading">
        READY <span className="plan-text">TO</span> START YOUR{" "}
        <span className="plan-text">JOURNEY?</span>{" "}
      </h1>
      <div className="plans-container">
        {planData.map((plan, index) => (
          <Plan key={index} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default Plans;
