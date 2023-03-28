const  mongoose  = require('mongoose')
const adminModel = require('../models/adminModel')
const login = require('./authController/login')
const {
  initiatePasswordReset,
  resetPassword 
}= require('./authController/passwordReset');
const { hashPassword } = require('./authController/passwordHash');
const getUser = require('./authController/authorize');
const { changePassword } = require('./authController/changePassword');

// admin log in
const adminLogin = async (req, res) => {
  await login(req, res, adminModel)
}

// get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await adminModel.find({})
    // Add image URLs to each admin object
    const adminsWithImages = admins.map(admin => {
      if (admin.image) {
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/admin/${admin.image}`
        admin.image = imageUrl
      }
      return admin
    })

    res.status(200).json(adminsWithImages)
  } catch (err) {
    res.status(400).json({ error: err.message })        
  }
}


// get single admin
const getAdmin = async (req, res) => {
  const id = await getUser(req, res)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such '})
  }

  const admin = await adminModel.findById(id)

  if (!admin) {
    return res.status(404).json({error: 'No such admin'})
  }

   res.status(200).json({
      id: admin._id,
      name: admin.name,
      lastName: admin.lastName,
      phone: admin.phone,
      email: admin.email,
      image: admin==""?"": `${req.protocol}://${req.get('host')}/uploads/admin/${admin.image}`,
    });
}


// add admin

const addAdmin = async (req, res) => {
console.log('this is body', req.body.data)  
console.log("file", req.file)  
  
const data = JSON.parse(req.body.data);
const name = data.name;
const lastName = data.lastName;
const phone = data.phone;
const email = data.email;
const password = data.password;
const isTaken = await adminModel.findOne({email})
  if (isTaken) {
   return res.status(401).json({error:"email is taken"})
  }

  
  console.log("body", password)
  if (req.file) {
    image = req.file.filename
  } else {
    image = ''
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    const admin = await adminModel.create({
    lastName,
    image,    
    superAdmin: false, 
    name,
    email,    
    phone ,      
    password: hashedPassword,     
    phone
    });
    res.status(200).json(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// delet admin
const deleteAdmin = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'invalid id'})
  }

  try {
    // Find admin in database
    const admin = await adminModel.findById(id)

    if (!admin) {
      return res.status(400).json({error: 'No such admin'})
    }

    // Delete image from file system if it exists
    if (admin.image) {
      const imagePath = path.join(__dirname, '../uploads/profile', admin.image)
      fs.unlinkSync(imagePath)
    }

    // Delete admin from database
    await adminModel.findByIdAndDelete(id)

    res.status(200).json(admin)
  } catch (err) {
    res.status(400).json({ error: err.message })        
  }
}


//update admin

const updateAdmin = async (req, res) => {
  const id = await getUser(req, res)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'invalid id'})
  }
    const admin = await adminModel.findOneAndUpdate({ _id: id }, {
      ...req.body
  })
  if (!admin) {
    return res.status(400).json({error: 'No such admin'})
  }
  res.status(200).json(admin)
}

// change password 
const updatePassword = async (req, res) => {
  await changePassword(req,res, adminModel)  
}


const passwordResetRequest = async (req, res) => {
  await initiatePasswordReset(req, res, adminModel)
}
const resetPasswordProcess = async (req, res) => {
  await resetPassword(req, res, adminModel)
}


module.exports = {
    addAdmin,
    getAllAdmins,
    getAdmin,
    deleteAdmin,
   updateAdmin,
  adminLogin,
  passwordResetRequest,
  resetPasswordProcess,
  updatePassword
  
}
