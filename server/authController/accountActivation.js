const tokenModel = require("../models/authModel");

const verifyEmail = async (req, res,userModel) => {
  const { token } = req.query;
  console.log(token)
  try {
    // Check if the token is valid and remove the verification token
    const userToken = await tokenModel.findOneAndDelete(token);
    console.log(userToken)
    if (!userToken || userToken.expiresAt <Date.now()) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }
    // Update the account status to active  
    const user = await userModel.findOne({email:userToken.email})    
    user.accountStatus = "active";    
    await user.save();    
    res.status(200).json({ message: "Email verified successfully." });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = verifyEmail