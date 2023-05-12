const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomeSchema = new Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HomeOwner",
    },
    images: [String],

    city: {
      type: String,
      default: "",
    },
    subCity: {
      type: String,
      default: "",
    },
    woreda: {
      type: String,
      default: "",
    },
    kebele: {
      type: String,
      default: "",
    },
    price: Number,
    homeStatus: {
      type: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    suspended: {
      type: Boolean,
      default: false,
    },
    isRented: {
      type: Boolean,
      default: false,
    },
    area: {
      type: Number,
      default: 0,
    },
    homeType: {
      type: String,
      default: "",
    },
    bedRoom: {
      type: Number,
      default: 0,
    },
    bathRoom: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    shortTerm: {
      checkin: String,
      checkout: String,
      maxGuest: String,
    },
    amenity: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Houses", HomeSchema);
