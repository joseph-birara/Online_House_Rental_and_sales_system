const  mongoose  = require('mongoose')
const houseModel = require('../models/houseModel')
const getUser = require('../authController/authorize');

// get all Houses
const getAllHouses = async (req, res) => {
  try {
    const houses = await houseModel.find();
    const housesWithImages = [];

    for (const house of houses) {
      const images = [];
      for (const imageName of house.images) {
        const imagePath = path.join(__dirname, 'uploads', 'House', imageName);
        images.push({ name: imageName, path: imagePath });
      }
      housesWithImages.push({ ...house.toJSON(), images });
    }

    res.status(200).json(housesWithImages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// get houses that belowng to same person
const getHousesByOwner = async (req, res) => {
  const ownerID = req.body.ownerID;
  if (!mongoose.Types.ObjectId.isValid(ownerID)) {
    return res.status(404).json({ error: 'Invalid ownerID' });
  }

  try {
    const houses = await houseModel.find({ ownerID: ownerID });
    if (!houses || houses.length === 0) {
      return res.status(404).json({ error: 'No houses found for ownerID' });
    }

    const housesWithImages = [];
    for (const house of houses) {
      const images = [];
      for (const imageName of house.images) {
        const imagePath = path.join(__dirname, 'uploads', 'House', imageName);
        images.push({ name: imageName, path: imagePath });
      }
      const houseWithImages = { ...house.toJSON(), images };
      housesWithImages.push(houseWithImages);
    }

    res.status(200).json(housesWithImages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getHouse = async (req, res) => {
  const houseID = req.body.id;
  if (!mongoose.Types.ObjectId.isValid(houseID)) {
    return res.status(404).json({ error: 'Invalid ID' });
  }

  try {
    const house = await houseModel.findById(houseID);
    if (!house) {
      return res.status(404).json({ error: 'House not found' });
    }

    const images = [];
    for (const imageName of house.images) {
      const imagePath = path.join(__dirname, 'uploads', 'House', imageName);
      images.push({ name: imageName, path: imagePath });
    }

    const houseWithImages = { ...house.toJSON(), images };
    res.status(200).json(houseWithImages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// add houses
const addHouse = async (req, res) => {
  const data = req.body
  try {
    const uploadFiles = util.promisify(upload('myFolder')); // change folder name as per your requirement
    await uploadFiles(req, res);
    const files = req.files; // get the uploaded files
    const fileNames = files.map(file => file.filename); // get the file names
    const house = await houseModel.create({ data, images: fileNames }); // add the file names to the house data
    res.status(200).json({ message: 'You have added House' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// delete House
const deleteHouse = async (req, res) => {
  const { id } = req.body
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'invalid id'})
  }
  try { 

    // Delete House from database
    const House= await houseModel.findByIdAndDelete(id)
    if (!House) {
      return res.status(400).json({error: 'No such House'})
    }

    // Delete images from disk
    const imageNames = House.images;
    imageNames.forEach((imageName) => {
      fs.unlink(`./uploads/myFolder/${imageName}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });

    res.status(200).json(House)
  } catch (err) {
    res.status(400).json({ error: err.message })        
  }
}
//update House
const updateHouse = async (req, res) => {
  const id = await getUser(req, res)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'invalid id'})
  }
    const House = await houseModel.findOneAndUpdate({ _id: id }, {
      ...req.body
  })
  if (!House) {
    return res.status(400).json({error: 'No such House'})
  }
  res.status(200).json(House)
}
const deletImage = async (req, res) => {
  const { id, index } = req.body
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'invalid id'})
  }
  try { 

    // retrive House from database
    const House= await houseModel.findById(id)
    if (!House) {
      return res.status(400).json({error: 'No such House'})
    }
    // Delete image from disk
    const imageName = House.images[index];
    fs.unlink(`./uploads/House/${imageName}`, (err) => {
        if (err) {
          console.error(err);
        }
    });

    // Remove image name from images array
    House.images.splice(index, 1);
    await House.save();

    res.status(200).json(House)
  } catch (err) {
    res.status(400).json({ error: err.message })        
  }
}

module.exports = {
    addHouse,
    getAllHouses,
    getHouse,
    deleteHouse,
   updateHouse,  
}
