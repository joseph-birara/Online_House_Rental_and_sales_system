const mongoose = require("mongoose");
const houseModel = require("../models/homeModel");
const getUser = require("../authController/authorize");
const util = require("util");

// get all Houses
const getAllHouses = async (req, res) => {
  console.log(req);
  try {
    const houses = await houseModel.find();
    res.status(200).json(houses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// get houses that belowng to same person
const getHousesByOwner = async (req, res) => {
  const ownerID = req.body.ownerID;
  if (!mongoose.Types.ObjectId.isValid(ownerID)) {
    return res.status(404).json({ error: "Invalid ownerID" });
  }

  try {
    const houses = await houseModel.find({ ownerID: ownerID });
    if (!houses || houses.length === 0) {
      return res.status(404).json({ error: "No houses found for ownerID" });
    }
    res.status(200).json(houses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getHouse = async (req, res) => {
  const houseID = req.body.id;
  if (!mongoose.Types.ObjectId.isValid(houseID)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  try {
    const house = await houseModel.findById(houseID);
    if (!house) {
      return res.status(404).json({ error: "House not found" });
    }

    res.status(200).json(house);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// add houses
const addHouse = async (req, res) => {
  const data = req.body; // parse the data string
  console.log(data);
  try {
    const house = await houseModel.create({ ...data });
    // add the file names to the house data
    res.status(200).json({ message: "You have added House" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete House
const deleteHouse = async (req, res) => {
  const { id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "invalid id" });
  }
  try {
    // Delete House from database
    const House = await houseModel.findByIdAndDelete(id);
    if (!House) {
      return res.status(400).json({ error: "No such House" });
    }

    res.status(200).json(House);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//update House
const updateHouse = async (req, res) => {
  const id = await getUser(req, res);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "invalid id" });
  }
  const House = await houseModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!House) {
    return res.status(400).json({ error: "No such House" });
  }
  res.status(200).json(House);
};
const deletImage = async (req, res) => {
  const { id, index } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "invalid id" });
  }
  try {
    // retrive House from database
    const House = await houseModel.findById(id);
    if (!House) {
      return res.status(400).json({ error: "No such House" });
    }

    // Remove image name from images array
    House.images.splice(index, 1);
    await House.save();

    res.status(200).json(House);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  addHouse,
  getAllHouses,
  getHouse,
  deleteHouse,
  updateHouse,
  deletImage,
  getHousesByOwner,
};
