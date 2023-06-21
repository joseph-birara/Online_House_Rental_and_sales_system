const { generateToken } = require("./auth");
const bcrypt = require("bcrypt");

const sendEmail = require("./sendEmial");
const { generateVerificationToken } = require("./saveToken");

async function login(req, res, userModel, useType) {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).json({ error: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({ error: "Invalid email or password" });
    }
    if (!user.accountStatus) {
      //resend the mail to verify account
      const verificationToken = await generateVerificationToken(user.email);
      // Send email verification email to the newly registered user
      let subject = "Account activation";
      let text = `Please click the following link to verify your email address: ${process.env.BASE_URL}/${useType}/verify-email/${verificationToken}`;
      await sendEmail(email, subject, text);
      return res.json({ message: "please activate account" });
    }
    if (user.suspended) {
      return res.status(201).send("Your Account is suspended");
    }
    const token = generateToken(user._id);
    return res.json({ token: token, user: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = login;
