const nodemailer = require('nodemailer')

const sendEmail = async (email, subject, text) => {
  try {
    // Create a transporter object using SMTP
    const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: process.env.SMTP_USER, // Your SMTP username
        pass: process.env.SMTP_PASS, // Your SMTP password
    },
    }); 
}
    catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email sending failed');
  }
  // Set up email data
  const mailOptions = {
    from: process.env.SMTP_USER, // Sender address
    to: email, // List of recipients
    subject: subject, // Subject line
    text: text, // Plain text body
  };
  // Send email
  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent:', info.response);
  return info;
  }

module.exports = sendEmail;
