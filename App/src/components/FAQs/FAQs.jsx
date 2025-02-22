import React, { useState } from "react";
import "./FAQs.css";
import gsap from 'gsap'
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger)
const FAQs = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqData = [
    {
      question: "What are your gym's opening hours?",
      answer: "Our gym is open from 5:00 AM to 11:00 PM on weekdays and 7:00 AM to 9:00 PM on weekends.",
    },
    {
      question: "Do I need to book classes in advance?",
      answer: "Yes, we recommend booking classes in advance to secure your spot, especially during peak hours.",
    },
    {
      question: "What membership options do you offer?",
      answer: "We offer monthly, quarterly, and yearly memberships with discounts for longer terms.",
    },
    {
      question: "Do you have personal trainers available?",
      answer: "Yes, we have certified personal trainers available for one-on-one sessions. Please inquire at the front desk.",
    },
    {
      question: "Is there a free trial available?",
      answer: "We offer a one-day free trial for new members. Contact us to schedule your trial session.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  useGSAP(() => {
    gsap.from('.faq-head', {
      y: -20,
      opacity: 0,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.faqs',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
    gsap.from('.faq-item', {
      stagger: .3,
      opacity: 0,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.faq-list',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
  })

  return (
    <section className="faqs">
      <h2 className="faq-head">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <h3>{faq.question}</h3>
              <span>{openFAQ === index ? "-" : "+"}</span>
            </div>
            {openFAQ === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
