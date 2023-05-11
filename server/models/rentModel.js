const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema({
  duration: String,
  startDate: Date,
  endDate: Date,
  paymentAmount: Number,
  paymentStatus: String,

  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HomeOwner",
  },
  homeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Houses",
  },
});

module.exports = mongoose.model("Rent", rentSchema);
