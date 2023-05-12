const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    houseId: ObjectId,
    ownerId: ObjectId,
    reviewerId: ObjectId,
    like: {
      type: Number,
      default: 0,
    },
    message: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Comment", commentSchema);
