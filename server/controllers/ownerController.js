const  mongoose  = require('mongoose')
const ownerModel = require('../models/ownerModel')
const login = require('../authController/login')
const sendVerificationEmail = require('../authController/sendEmial')
const {
  initiatePasswordReset,
  resetPassword 
}= require('../authController/passwordReset');
const { hashPassword } = require('../authController/passwordHash');
const getUser = require('../authController/authorize');
const { changePassword } = require('../authController/changePassword');

// Owner log in
const OwnerLogin = async (req, res) => {
  await login(req, res, ownerModel)
}

// get all Owners
const getAllOwners = async (req, res) => {
  try {
    const Owners = await ownerModel.find({})
    // register image URLs to each Owner object
    const OwnersWithImages = Owners.map(Owner => {
      if (Owner.image) {
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/Owner/${Owner.image}`
        Owner.image = imageUrl
      }
      return Owner
    })

    res.status(200).json(OwnersWithImages)
  } catch (err) {
    res.status(400).json({ error: err.message })        
  }
}


// get single Owner
const getOwner = async (req, res) => {
  const id = await getUser(req, res)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such '})
  }

  const Owner = await ownerModel.findById(id)

  if (!Owner) {
    return res.status(404).json({error: 'No such Owner'})
  }

   res.status(200).json({
      id: Owner._id,
      name: Owner.name,
      lastName: Owner.lastName,
      phone: Owner.phone,
     email: Owner.email,
     city: Owner.city,
     subCity: Owner.subCity,
     kebele: Owner.kebele,
      
      image: Owner==""?"": `${req.protocol}://${req.get('host')}/uploads/Owner/${Owner.image}`,
    });
}


// register Owner
const registerOwner = async (req, res) => {
  console.log('this is body', req.body.data);
  console.log('file', req.file);
  const data = JSON.parse(req.body.data);
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

  // Check if email is already taken
  const isTaken = await ownerModel.findOne({ email });
  if (isTaken) {
    return res.status(401).json({ error: 'email is taken' });
  }

  // Hash password
  const hashedPassword = await hashPassword(password);
  // Generate email verification token
  const verificationToken =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  try {
    const owner = await ownerModel.create({
      lastName,
      image: req.file?.filename || '',
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
      accountStatus: 'inactive',
      saleId,
      verificationToken, // add verification token to owner document
    });

    // Send email verification email to the newly registered user
    let subject = "Account activation"
    text = `Please click the following link to verify your email address: ${process.env.BASE_URL}/verify-email/${verificationToken}`
    await sendVerificationEmail(email, name, verificationToken);

    res.status(200).json({
      message: 'owner registered successfully. Please check your email for verification.',
      owner,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// delet Owner
const deleteOwner = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'invalid id'})
  }

  try {
    // Find Owner in database
    const Owner = await ownerModel.findById(id)

    if (!Owner) {
      return res.status(400).json({error: 'No such Owner'})
    }

    // Delete image from file system if it exists
    if (Owner.image) {
      const imagePath = path.join(__dirname, '../uploads/profile', Owner.image)
      fs.unlinkSync(imagePath)
    }

    // Delete Owner from database
    await ownerModel.findByIdAndDelete(id)

    res.status(200).json(Owner)
  } catch (err) {
    res.status(400).json({ error: err.message })        
  }
}


//update Owner

const updateOwner = async (req, res) => {
  const id = await getUser(req, res)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'invalid id'})
  }
    const Owner = await ownerModel.findOneAndUpdate({ _id: id }, {
      ...req.body
  })
  if (!Owner) {
    return res.status(400).json({error: 'No such Owner'})
  }
  res.status(200).json(Owner)
}

// change password 
const updatePassword = async (req, res) => {
  await changePassword(req,res, ownerModel)  
}


const passwordResetRequest = async (req, res) => {
  await initiatePasswordReset(req, res, ownerModel)
}
const resetPasswordProcess = async (req, res) => {
  await resetPassword(req, res, ownerModel)
}


module.exports = {
    registerOwner,
    getAllOwners,
    getOwner,
    deleteOwner,
   updateOwner,
  OwnerLogin,
  passwordResetRequest,
  resetPasswordProcess,
  updatePassword
  
}
