const mongoose = require("mongoose");
const ownerModel = require("../models/ownerModel");
const login = require("../authController/login");
const sendVerificationEmail = require("../authController/sendEmial");
const {
  initiatePasswordReset,
  resetPassword,
} = require("../authController/passwordReset");
const { hashPassword } = require("../authController/passwordHash");
const getUser = require("../authController/authorize");
const { changePassword } = require("../authController/changePassword");
const verifyEmail = require("../authController/accountActivation");
const { text } = require("body-parser");

const { generateVerificationToken } = require("../authController/saveToken");
const { generateToken } = require("../authController/auth");

// Owner log in
const OwnerLogin = async (req, res) => {
  await login(req, res, ownerModel);
};

// get all Owners
const getAllOwners = async (req, res) => {
  try {
    const Owners = await ownerModel.find({});

    res.status(200).json(Owners);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get single Owner
const getOwner = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such " });
  }

  const Owner = await ownerModel.findById(id);

  if (!Owner) {
    return res.status(404).json({ error: "No such Owner" });
  }

  res.status(200).json({ Owner });
};
// register Owner
const registerOwner = async (req, res) => {
  console.log("this is body", req.body);
  const data = req.body;
  const name = data.name;
  const lastName = data.lastName;
  const phone = data.phone;
  const email = data.email;
  const password = data.password;
  const city = data.city;
  const subCity = data.subCity;
  const kebele = data.kebele;
  const saleId = [];
  const aplicantId = [];
  const rentId = [];
  const image = data.image;

  // Check if email is already taken
  const isTaken = await ownerModel.findOne({ email });
  if (isTaken) {
    return res.status(401).json({ error: "email is taken" });
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  let session;
  try {
    session = await ownerModel.startSession(); // start a transaction
    session.startTransaction();

    const owner = await ownerModel.create(
      [
        {
          lastName,
          image,
          superOwner: false,
          name,
          email,
          phone,
          password: hashedPassword,
          phone,
          city,
          subCity,
          kebele,
          rentId,
          aplicantId,
          accountStatus: "inactive",
          saleId,
        },
      ],
      { session } // pass the session to the create method
    );

    // generate and save token to verify email and activate account
    const verificationToken = await generateVerificationToken(email);

    // Send email verification email to the newly registered user
    let subject = "Account activation";
    let text = `Please click the following link to verify your email address: ${process.env.BASE_URL}/owner/verify-email/${verificationToken}`;
    await sendVerificationEmail(email, subject, text);

    await session.commitTransaction(); // commit the transaction
    const token = generateToken(owner._id);

    res.status(200).json({
      token: token,
      message:
        "owner registered successfully. Please check your email for verification.",
      user: owner[0],
    });
  } catch (err) {
    if (session) {
      await session.abortTransaction(); // rollback the transaction if an error occurs
      session.endSession(); // end the session
    }
    res.status(400).json({ error: err.message });
  } finally {
    if (session) {
      session.endSession(); // end the session
    }
  }
};

// activate account

const activateAccount = async (req, res) => {
  await verifyEmail(req, res, ownerModel);
};

// delet Owner
const deleteOwner = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "invalid id" });
  }

  try {
    // Find Owner in database
    const Owner = await ownerModel.findById(id);

    if (!Owner) {
      return res.status(400).json({ error: "No such Owner" });
    }
    // Delete Owner from database
    await ownerModel.findByIdAndDelete(id);

    res.status(200).json(Owner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//update Owner

const updateOwner = async (req, res) => {
  try {
    const id = await getUser(req, res);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid ID" });
    }
    const owner = await ownerModel.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!owner) {
      return res.status(400).json({ error: "No such owner" });
    }
    res.status(200).json(owner);
  } catch (error) {
    if (error.message === "Unauthorized") {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
};

// change password
const updatePassword = async (req, res) => {
  await changePassword(req, res, ownerModel);
};

const passwordResetRequest = async (req, res) => {
  await initiatePasswordReset(req, res, ownerModel);
};
const resetPasswordProcess = async (req, res) => {
  await resetPassword(req, res, ownerModel);
};

module.exports = {
  registerOwner,
  getAllOwners,
  getOwner,
  deleteOwner,
  updateOwner,
  OwnerLogin,
  passwordResetRequest,
  resetPasswordProcess,
  updatePassword,
  activateAccount,
};
