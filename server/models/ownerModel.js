const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OwnerSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      Required: true,
    },
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
    phone: {
      type: String,
      default: "",
    },
    suspended: {
      type: Boolean,
      default: false,
    },
    accountStatus: {
      type: String,
      default: "inactive",
    },
    house: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Houses",
      },
    ],
    applicationId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    saleId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sale",
      },
    ],
    rentId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rent",
      },
    ],
    requestId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Maintenance",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomeOwner", OwnerSchema);
