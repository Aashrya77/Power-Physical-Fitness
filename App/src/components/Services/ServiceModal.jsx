// ServiceModal.js
import React from "react";
import Modal from "react-modal";
import "./ServiceModal.css"; // Style the modal here

Modal.setAppElement("#root"); // Prevents screen readers from reading the background

const ServiceModal = ({ isOpen, onClose, serviceDetails }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onClose} 
      className="modal"
      overlayClassName="overlay"
    >
      <h2>{serviceDetails.title}</h2>
      <p>{serviceDetails.description}</p>
      <button onClick={onClose} className="close-button">Close</button>
    </Modal>
  );
};

export default ServiceModal;
