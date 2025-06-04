import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./ContactInfo.css";
import { API_URL } from "../../config";

const ContactInfo = () => {
  const sendEmail = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;
    
    try {
      const response = await fetch(`${API_URL}/api/v1/gym/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, subject: `Message from ${name}`, text: message }),
      });

      if (response.ok) {
        alert('Email sent successfully!');
        form.reset();
      } else {
        alert('Failed to send email. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An error occurred while sending the email.');
    }
  }
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
        <form action="" method="POST" onSubmit={sendEmail}>
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
