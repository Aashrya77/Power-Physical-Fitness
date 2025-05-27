const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const sendEmail = require('../controllers/sendEmail');

router.post('/send',auth, async (req, res) => {
  const { email, subject, text } = req.body;

  try {
    const info = await sendEmail(email, subject, text);
    res.status(200).json({ message: 'Email sent successfully', info });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}
);

module.exports = router;