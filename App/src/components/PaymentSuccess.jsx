import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [message, setMessage] = useState('Verifying payment...');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const transactionData = JSON.parse(sessionStorage.getItem('esewa_transaction'));
        if (!transactionData) {
          throw new Error('No transaction data found');
        }

        const { transaction_uuid, total_amount } = transactionData;
        
        // Verify payment status
        const response = await axios.get(
          `http://localhost:5500/api/v1/gym/verify-payment?transaction_uuid=${transaction_uuid}&total_amount=${total_amount}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        if (response.data.success) {
          const { user } = response.data;
          // Update user in local storage if needed
          const currentUser = JSON.parse(localStorage.getItem('user'));
          if (currentUser) {
            localStorage.setItem('user', JSON.stringify({
              ...currentUser,
              subscriptionStatus: user.subscriptionStatus,
              subscriptionEnd: user.subscriptionEnd,
              planId: user.planId
            }));
          }

          setMessage('Payment successful! Redirecting to profile...');
          setTimeout(() => {
            navigate('/profile');
          }, 2000);
        } else {
          setMessage('Payment verification failed. Please contact support.');
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }

        // Clean up
        sessionStorage.removeItem('esewa_transaction');
      } catch (error) {
        console.error("Payment verification failed:", error);
        setMessage('Error verifying payment. Please contact support.');
        setTimeout(() => {
          navigate('/cancel');
        }, 2000);
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [navigate]);

  return (
    <div className="payment-success-container" style={{ 
      textAlign: 'center', 
      padding: '2rem',
      maxWidth: '600px',
      margin: '0 auto',
      marginTop: '2rem'
    }}>
      <div className="payment-status-card" style={{
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: '#fff'
      }}>
        <h2>{verifying ? 'Verifying Payment' : 'Payment Status'}</h2>
        <p>{message}</p>
        {verifying && (
          <div className="loading-spinner" style={{
            margin: '1rem auto',
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        )}
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default PaymentSuccess;