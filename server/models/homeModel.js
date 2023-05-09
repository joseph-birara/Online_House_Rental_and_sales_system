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
    isRented: Boolean,
    area: Number,
    description: String,
    HomeType: String,
    bedRoom: Number,
    bathRoom: Number,
    description: String,
    title: String,
    shortTerm: {
      checkin: String,
      checkout: String,
      maxGuest: String
    },
    ameneniteis: {
      washer: Boolean,
      wifi: Boolean,
      airConditioning: Boolean,
      freezer: Boolean,
      dryer: Boolean,
      workSpace: Boolean,
      gym: Boolean,
      heater: Boolean,
      pool: Boolean,
      terrace: Boolean,
      parking: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Houses", HomeSchema);
