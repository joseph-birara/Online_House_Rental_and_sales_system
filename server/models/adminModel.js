const mongoose = require("mongoose");
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

module.exports = mongoose.model("Admin", AdminSchema);
