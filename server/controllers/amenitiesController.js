const  mongoose  = require('mongoose')
const amenitiesModel = require('../models/amenitiesModel')

const getUser = require('../authController/authorize');

// get all Amenitiess
const getAllAmenitiess = async (req, res) => {
  try {
    const amenities = await amenitiesModel.find({})  

    res.status(200).json(amenities)
  } catch (err) {
    res.status(400).json({ error: err.message })        
  }
}
// get single Amenities
const getAmenities = async (req, res) => {
  const houseID = req.body.id
  if (!mongoose.Types.ObjectId.isValid(houseID)) {
    return res.status(404).json({error: 'invalid id '})
  }
  const amenities = await amenitiesModel.findById(houseID)
  if (!amenities) {
    return res.status(404).json({error: 'This house do not have amenities'})
  }
   res.status(200).json(amenities);
}

// register Amenities
const addAmenities = async (req, res) => {
    const data = req.body
  try {
    const amenities = await amenitiesModel.create({data});
    res.status(200).json({message:"you have added amenities to your house"});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delet Amenities
const deleteAmenities = async (req, res) => {
  const { id } = req.body
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'invalid id'})
  }

  try {  

    // Delete Amenities from database
     const amenities= await amenitiesModel.findByIdAndDelete(id)
    if (!amenities) {
      return res.status(400).json({error: 'No such Amenities'})
    } 
    res.status(200).json(amenities)
  } catch (err) {
    res.status(400).json({ error: err.message })        
  }
}

//update Amenities
const updateAmenities = async (req, res) => {
  const id = await getUser(req, res)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'invalid id'})
  }
    const amenities = await amenitiesModel.findOneAndUpdate({ _id: id }, {
      ...req.body
  })
  if (!amenities) {
    return res.status(400).json({error: 'No such Amenities'})
  }
  res.status(200).json(amenities)
}


module.exports = {
    addAmenities,
    getAllAmenitiess,
    getAmenities,
    deleteAmenities,
   updateAmenities,  
}
