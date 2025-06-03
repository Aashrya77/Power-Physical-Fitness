const nodemailer = require('nodemailer')

const sendEmail = async (email, subject, text) => {
  try {
    // Clean up environment variables (remove quotes if present)
    const smtpUser = process.env.SMTP_USER ? process.env.SMTP_USER.replace(/['"]/g, '') : '';
    const smtpPass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/['"]/g, '') : '';
    
    console.log('Attempting to send email with the following configuration:');
    console.log('SMTP User:', smtpUser);
    console.log('SMTP Pass exists:', !!smtpPass);
    
    // Create a transporter object using SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false
      }
    });
    
    // Verify connection configuration
    await transporter.verify();
    console.log('Server is ready to take our messages');
    
    // Set up email data
    const mailOptions = {
      from: `"Power Physical Fitness" <${smtpUser}>`, // Sender name and email
      to: email, // List of recipients
      subject: subject, // Subject line
      text: text, // Plain text body
      // You can also add HTML version
      html: `<p>${text}</p>`, // HTML body content
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email sending failed: ' + error.message);
  }
}

module.exports = sendEmail;
