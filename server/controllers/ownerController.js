const  mongoose  = require('mongoose')
const ownerModel = require('../models/ownerModel')
const login = require('../authController/login')
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
console.log('this is body', req.body.data)  
console.log("file", req.file)    
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

const isTaken = await ownerModel.findOne({email})
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
    const Owner = await ownerModel.create({
    lastName,
    image,    
    superOwner: false, 
    name,
    email,    
    phone ,      
    password: hashedPassword,     
      phone,
      city,
      subCity,
      kebele,
      rentId,
      aplicantId,
    saleId
    });
    res.status(200).json(Owner);
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
