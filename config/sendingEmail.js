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

const sendPasswordResetEmail = async (email, resetToken) => {
  // Define the transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  // Create the reset link
  const resetLink = `http://localhost:3000/reset-password?code=${resetToken}`; // Front-end URL

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <h1>Password Reset</h1>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a style="color: blue;" href="${resetLink}">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `,
  };

  // Send the email
  try {
    console.log('Sending password reset email to:', email);
    console.log('Reset link:', resetLink);

    await transporter.sendMail(mailOptions);

    console.log('Password reset email sent successfully.');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};


module.exports = { sendVerificationEmail, sendPasswordResetEmail };

