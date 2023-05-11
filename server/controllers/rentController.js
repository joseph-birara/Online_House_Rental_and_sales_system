const mongoose = require("mongoose");

const rentModel = require("../models/rentModel");
const tenantModel = require("../models/tenantModel");
const ownerModel = require("../models/ownerModel");

// add rent information to database

const addRentInformation = async (req, res) => {
  try {
    const rentInfo = await rentModel.create(req.body);
    if (!rentInfo) {
      return res.status(404).json({ message: "faild!" });
    }

    //retrive owner and tenant and add the id of the rent
    const tenant = await tenantModel.findOne(rentInfo.tenantId);
    const owner = await ownerModel.findOne(rentInfo.ownerId);

    // update with rent id
    tenant.rentId.push(rentInfo._id);
    owner.rentId.push(rentInfo._id);
    //save both to db
    await tenant.save();
    await owner.save();
    return res.status(201).json({ message: "rent information added !" });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

//delete rent information
const deleteRentInformation = async (req, res) => {
  try {
    const rentInfo = await rentModel.findOneAndDelete();
    if (!rentInfo) {
      return res.status(400).json("no information found");
    }
    return res.status(201).json({ message: "deleted successfully" });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};
// get rent information by id

const getRentInformationByID = async (req, res) => {
  try {
    const id = req.body.id;
    const information = await rentModel.findByID(id);
    if (!information) {
      return res.status(400).json({ message: "empty list" });
    }
    return res.status(200).json(information);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

// get all rent information
const getAllRent = async (req, res) => {
  try {
    const information = await rentModel.find({});
    if (!information) {
      return res.status(400).json({ message: "empty list" });
    }
    return res.status(200).json(information);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

module.exports = {
  addRentInformation,
  deleteRentInformation,
  getRentInformationByID,
  getAllRent,
};
