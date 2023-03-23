const  mongoose  = require('mongoose')
const adminModel = require('../models/adminModel')


// get all admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await adminModel.find({})
        res.status(200).json(admins)
        // console.log(req.body)        
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
         
    try {
        const admin = await adminModel.create(req.body)
        res.status(200).json(admin)
        console.log(req.body)        
    } catch (err) {
        res.status(400).json({error:err.message})
    }
}



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
    updateAdmin
}
