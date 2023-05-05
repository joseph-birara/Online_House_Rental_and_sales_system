const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomeSchema = new Schema(
  {
    ownerID: ObjectId,
    images: [
      {
        type: String,
      },
    ],
    password: String,
    city: String,
    subCity: String,
    woreda: String,
    kebele: String,
    price: Number,
    homeStatus: String,
    verified: {
      type: Boolean,
      default: false,
    },
    suspended: Boolean,
    area: Number,
    description: String,
    HomeType: String,
    bedRoom: Number,
    bathRoom: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Houses", HomeSchema);
