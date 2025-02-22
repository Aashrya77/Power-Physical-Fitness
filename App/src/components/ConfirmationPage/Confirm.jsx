import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Confirm.css";
import axios from "axios";

const Confirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { planName, months, price, planId } = location.state || {};

  const handleConfirm = () => {
    navigate("/payment", { state: { planName, months, price } });
  };

  const handleCancel = () => {
    navigate("/plans");
  };

  if (!planName || !months || !price) {
    return <p>No plan selected. Please go back and choose a plan.</p>;
  }

  const handlePayment = async (planId, months) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to make a payment');
        navigate('/login');
        return;
      }

      // Get payment form data from server
      const response = await axios.post(
        "http://localhost:5500/api/v1/gym/esewa-payment",
        { planId, months },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const { formData, postUrl } = await response.data;
      
      // Create and submit form to eSewa
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = postUrl;

      // Add all required fields
      Object.entries(formData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      // Store transaction details for verification
      sessionStorage.setItem('esewa_transaction', JSON.stringify({
        transaction_uuid: formData.transaction_uuid,
        total_amount: formData.total_amount
      }));

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    } catch (error) {
      console.error("Payment initiation failed:", error);
      if (error.response?.status === 401) {
        alert("Please log in to make a payment");
        navigate('/login');
      } else if (error.response) {
        // Server responded with error
        alert(error.response.data.message || "Payment initiation failed. Please try again.");
      } else if (error.request) {
        // Request made but no response
        alert("Could not connect to the server. Please check your internet connection.");
      } else {
        // Something else went wrong
        alert("Payment initiation failed. Please try again.");
      }
    }
  };

  const verifyPayment = async () => {
    try {
      const transactionData = JSON.parse(sessionStorage.getItem('esewa_transaction'));
      if (!transactionData) {
        throw new Error('No transaction data found');
      }

      const { transaction_uuid, total_amount } = transactionData;
      
      // Verify payment status
      const response = await axios.get(
        `http://localhost:5500/api/v1/gym/verify-payment?transaction_uuid=${transaction_uuid}&total_amount=${total_amount}`
      );

      if (response.data.success) {
        // Payment verified successfully
        alert('Payment completed successfully!');
        // TODO: Update UI or redirect to success page
        navigate('/profile'); // or wherever you want to redirect
      } else {
        // Payment verification failed
        alert('Payment verification failed. Please contact support.');
        navigate('/');
      }

      // Clean up
      sessionStorage.removeItem('esewa_transaction');
    } catch (error) {
      console.error("Payment verification failed:", error);
      alert('Error verifying payment. Please contact support.');
      navigate('/cancel');
    }
  };

  useEffect(() => {
    if (location.pathname === '/confirm' && location.state?.fromEsewa) {
      verifyPayment();
    }
  }, [location]);

  return (
    <div className="confirmation-page">
      <div className="confirm">
        <h1>Confirm Your Plan</h1>
        <p>
          You have selected the <strong>{planName}</strong> plan for{" "}
          <strong>
            {months} month{months > 1 ? "s" : ""}
          </strong>
          .
        </p>
        <p>Total Price: ₹{price}</p>

        <div className="confirmation-actions">
          <button className="confirm-button" onClick={() => handlePayment(planId, months)}>
            Confirm and pay via Esewa
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
