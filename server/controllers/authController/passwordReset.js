
const nodemailer = require('nodemailer');
const tokenModel = require('../../models/authModel');
const { hashPassword } = require('./passwordHash');

// Function to generate a random token
const generateToken = () => {
  return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
};

// Function to send password reset email
async function sendPasswordResetEmail(email,name, resetToken) {
  // create a nodemailer transporter with your email service provider configuration
  console.log("email iside sender",email)
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass:process.env.PASSWORD ,
    },
  });
  // set up the email message
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Password Reset Request',
    text: `Hello ${name},\n\nYou recently requested to reset your password for your account. Please use the following code to reset your password:\n\n\n ${resetToken}\n\n\nIf you did not request a password reset, please ignore this email.\n\nThanks,\n\n House Hub`,
  };

  // send the email
  const info = await transporter.sendMail(mailOptions);
  console.log(`Password reset email sent to ${email}: ${info.messageId}`);
}

// Function to verify token and retrieve user
const verifyToken = async (email, token, userModel) => {
  // remove the token from the database if aavilable 
  const userToken = await tokenModel.findOneAndDelete({
    email,
    token: token,
   expiresAt: { $gt: Date.now() },
  });
  if (!userToken) {
    throw new Error('Invalid or expired token');
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  // remove the token from the database
  
  return user;
};




// Function to initiate password reset process
const initiatePasswordReset = async (req, res,userModel) => {
    const { email } = req.body;
  const user = await userModel.findOne({ email })
  console.log("emial", email)
  console.log("user", user)
  
    
  try {
    const token = generateToken();
    const expiryDate = new Date(Date.now() + 3600000); // set expiry to 1 hour from now
    const newToken = new tokenModel({
      email: email,
      token: token,
      expiresAt: expiryDate,
    });
    await newToken.save();
    await sendPasswordResetEmail( email, user.name , token);
    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Function to reset user password
const resetPassword = async (req, res,userModel) => {
  const { email, token, password } = req.body;
  try {
    const user = await verifyToken(email, token, userModel);
    
    //need to be hashed befor save
    user.password = await hashPassword(password);;    
    await user.save();
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { initiatePasswordReset, resetPassword };
