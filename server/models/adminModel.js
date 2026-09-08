const mongoose = require("mongoose");
const hidePassword = require("../utils/hidePassword");
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    suspended: {
      type: Boolean,
      default: false,
    },
    accountStatus: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      default: "",
    },
    superAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

hidePassword(AdminSchema);

module.exports = mongoose.model("Admin", AdminSchema);
