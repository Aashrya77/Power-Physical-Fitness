import React from "react";
import "./CTA.css";
import { useNavigate } from "react-router-dom";
const CTA = () => {
  const navigate = useNavigate()
  return (
    <section className="cta-section" >
      <div className="cta-content">
        <h2>Ready to Transform Your Life?</h2>
        <p>
          Join Power Fitness today and start your journey toward a healthier,
          stronger you. Our expert trainers, customized programs, and community
          of fitness enthusiasts are here to support you every step of the way.
        </p>
        <button className="cta-button" onClick={() => navigate('/register')}>Join Now</button>
      </div>
    </section>
  );
};

export default CTA;
