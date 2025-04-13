import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./ContactInfo.css";

const ContactInfo = () => {
  return (
    <section className="contact-info" id="contact">
      <div className="contactLeft">
         <div className="contact-details">
        <h1>Contact Us</h1>
        <p><FaMapMarkerAlt/>Har har mahadev, Kathmandu, Nepal</p>
        <p><FaPhoneAlt />+977 9801321239</p>
        <p><FaEnvelope /> contact@powerfitness.com</p>
      </div>
      
      <div className="social-links">
        <div className="icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={30}/></a>
          <a href="https://www.instagram.com/power.physicalfitness/" target="_blank" rel="noopener noreferrer"><FaInstagram size={30}/></a>
        </div>
      </div>
      </div>
     
      <div className="AnyMessage">
        <form action="">
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" placeholder="Username"/>
          <label htmlFor="email">Email: </label>
          <input type="text" name="email" placeholder="Your Email"/>
          <label htmlFor="message">Message: </label>
          <textarea name="message" id="message" placeholder="Your message here..."></textarea>
          <button>Submit</button>
        </form>
      </div>
    </section>
  );
};

export default ContactInfo;
