const getUser = require("../authController/authorize");
const commentModel = require("../models/commentModel");

const mongoose = require("mongoose");
const getByOwner = async (req, res) => {
  const id = req.params;
  const comments = await commentModel.find({ ownerId: id });
  if (!comments) {
    return res
      .status(200)
      .json({ message: "no comments found for this owner" });
  }
  return comments;
};
const getByHouse = async (req, res) => {
  const id = req.params;
  const comments = await commentModel.find({ ownerId: id });
  if (!comments) {
    return res
      .status(200)
      .json({ message: "no comments found for this house" });
  }
  return res.status(200).json(comments);
};

const addComment = async (req, res) => {
  try {
    const comment = await commentModel.create(req.body);
    return res.status(200).json({ message: "comment added" });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

const editComment = async (req, res) => {
  const id = req.body.id;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "invalid id" });
  }
  try {
    const comment = await commentModel.findByIdAndUpdate(id);
    if (!comment) {
      return res.status(401).json({ message: "no comment found" });
    }
    return res.status(200).json({ message: "comment edited !" });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await commentModel.findByIdAndDelete(id);
    if (!comment) {
      return res.status(401).json({ message: "no comment found" });
    }
    return res.status(200).json({ message: "comment deleted!" });
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};

module.exports = {
  getByHouse,
  getByOwner,
  deleteComment,
  editComment,
  addComment,
};
