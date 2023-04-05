const verifyEmail = async (req, res,userModel) => {
  const { email, token } = req.query;

  try {
    // Check if the token is valid
    const user = await userModel.findOne({ email, verificationToken: token });
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }
    // Update the account status to active and remove the verification token
    user.accountStatus = "active";
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully." });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = verifyEmail