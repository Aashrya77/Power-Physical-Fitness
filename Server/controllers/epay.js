const express = require("express");
const Plan = require("../schema/Plan");
const User = require("../schema/User");
const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const router = express.Router();
//Esewa payment integration
// eSewa test credentials and endpoints

const ESEWA_MERCHANT_CODE = process.env.ESEWA_MERCHANT_CODE;
const ESEWA_SECRET_KEY = process.env.ESEWA_SECRET_KEY;
const ESEWA_TEST_URL = process.env.ESEWA_TEST_URL;
const ESEWA_STATUS_URL = process.env.ESEWA_STATUS_URL;
const SUCCESS_URL = process.env.SUCCESS_URL;
const FAILURE_URL = process.env.FAILURE_URL;


router.post("/esewa-payment", async (req, res) => {
  try {
    const { planId, months } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!planId || !months) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Determine the price based on the subscription duration
    let amount;
    switch (parseInt(months)) {
      case 1: amount = plan.prices.price1Month; break;
      case 3: amount = plan.prices.price3Months; break;
      case 6: amount = plan.prices.price6Months; break;
      case 12: amount = plan.prices.price12Months; break;
      default:
        return res.status(400).json({ message: "Invalid subscription duration" });
    }

    // Generate unique transaction ID (alphanumeric and hyphen only)
    const transaction_uuid = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    // Store payment details in global Map (since we don't have session middleware)
    global.paymentDetails = global.paymentDetails || new Map();
    global.paymentDetails.set(transaction_uuid, {
      planId,
      months: parseInt(months),
      userId,
      transaction_uuid
    });

    // Required parameters as per eSewa documentation
    const amount_val = amount;
    const tax_amount = 0;
    const product_service_charge = 0;
    const product_delivery_charge = 0;
    const total_amount = amount_val + tax_amount + product_service_charge + product_delivery_charge;

    // Generate signature (exactly as per documentation)
    const signedFieldsString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${ESEWA_MERCHANT_CODE}`;
    const hash = CryptoJS.HmacSHA256(signedFieldsString, ESEWA_SECRET_KEY);
    const signature = CryptoJS.enc.Base64.stringify(hash);

    // Create form data object with exact parameter names
    const formData = {
      amount: amount_val.toString(),
      tax_amount: tax_amount.toString(),
      product_service_charge: product_service_charge.toString(),
      product_delivery_charge: product_delivery_charge.toString(),
      total_amount: total_amount.toString(),
      transaction_uuid: transaction_uuid,
      product_code: ESEWA_MERCHANT_CODE,
      success_url: "http://localhost:5173/success",
      failure_url: "http://localhost:5173/cancel",
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature: signature
    };

    return res.status(200).json({ formData, postUrl: ESEWA_TEST_URL });
  } catch (error) {
    console.error("Payment initiation error:", error);
    res.status(500).json({ 
      message: "Error initiating payment", 
      error: error.message 
    });
  }
});

// Verify transaction status and update subscription
router.get("/verify-payment", async (req, res) => {
  try {
    const { transaction_uuid, total_amount } = req.query;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!transaction_uuid || !total_amount) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const verifyUrl = `${ESEWA_STATUS_URL}/?product_code=${ESEWA_MERCHANT_CODE}&total_amount=${total_amount}&transaction_uuid=${transaction_uuid}`;
    
    const response = await axios.get(verifyUrl);
    const { status, ref_id } = response.data;

    if (status === "COMPLETE") {
      // Get stored payment details
      const paymentDetails = global.paymentDetails?.get(transaction_uuid);
      
      if (!paymentDetails) {
        return res.status(400).json({ 
          success: false, 
          message: "Payment details not found" 
        });
      }

      if (paymentDetails.userId !== userId) {
        return res.status(401).json({ 
          success: false, 
          message: "Unauthorized payment verification" 
        });
      }

      const { planId, months } = paymentDetails;

      // Get current user to check existing subscription
      const currentUser = await User.findById(userId);
      if (!currentUser) {
        return res.status(404).json({ 
          success: false, 
          message: "User not found" 
        });
      }

      // Calculate subscription dates
      let startDate = new Date();
      let endDate = new Date();

      // If user has an active subscription, extend it
      if (currentUser.subscriptionStatus === "active" && 
          currentUser.subscriptionEnd && 
          new Date(currentUser.subscriptionEnd) > new Date()) {
        // Use current end date as start date for extension
        startDate = new Date(currentUser.subscriptionEnd);
        endDate = new Date(currentUser.subscriptionEnd);
      }

      // Add months to the end date
      endDate.setMonth(endDate.getMonth() + months);

      // Update user subscription details
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          planId,
          subscriptionStatus: "active",
          subscriptionStart: startDate,
          subscriptionEnd: endDate
        },
        { new: true }
      );

      // Clear payment details
      global.paymentDetails.delete(transaction_uuid);

      return res.status(200).json({ 
        success: true, 
        message: "Payment verified and subscription updated",
        ref_id,
        status,
        user: updatedUser
      });
    } else {
      return res.status(400).json({ 
        success: false, 
        message: "Payment verification failed",
        status 
      });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error verifying payment",
      error: error.message
    });
  }
});

module.exports = router;
