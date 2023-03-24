const  mongoose  = require('mongoose')
const adminModel = require('../models/adminModel')
const bcrypt = require('bcrypt');
const { verifyToken } = require('./auth');
const login = require('./login')

// admin log in
const adminLogin = async (req, res) => {
  await login(req, res, adminModel)
}

// get all admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await adminModel.find({})
        res.status(200).json(admins)                
    } catch (err) {
        res.status(400).json({ error: err.message })        
    }
}

// get single admin
const getAdmin = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such '})
  }

  const admin = await adminModel.findById(id)

  if (!admin) {
    return res.status(404).json({error: 'No such admin'})
  }

  res.status(200).json(admin)
}

// add admin

const addAdmin = async (req, res) => {
  const {   
    lastName,
    image,    
    superAdmin= false, 
    name,
    email,
    password  ,
    phone 
  } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const admin = await adminModel.create({
    lastName,
    image,    
    superAdmin, 
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
  const admin = await adminModel.findOneAndDelete({_id:id})
  if (!admin) {
    return res.status(400).json({error: 'No such admin'})
  }
  res.status(200).json(admin)
}

//update admin

const updateAdmin = async (req, res) => {
  const { id } = req.params

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



module.exports = {
    addAdmin,
    getAllAdmins,
    getAdmin,
    deleteAdmin,
  updateAdmin,
    adminLogin
}
