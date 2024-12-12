const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // Example: 'gmail'
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your email',
    html: `
      <h1>Welcome!</h1>
      <p>Please verify your email by clicking the link below:</p>
      <a style="color: blue;" href="http://localhost:4000/api/verify-email?code=${verificationCode}">Verify Email</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully.');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

module.exports = sendVerificationEmail;
