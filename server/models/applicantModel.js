const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const StatusEnum = Object.freeze({
  PENDING: "pending",
  REJECTED: "rejected",
  ACCEPTED: "accepted",
});

const applicationSchema = new mongoose.Schema({
  checkin: String,
  checkout: String,
  numGuests: Number,
  paymentAmount: Number,
  paymentStatus: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: Object.values(StatusEnum),
    default: StatusEnum.PENDING,
  },
  duration: String,
  applicantId: {
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
  visitRequest: Date,
  applicationType: {
    type: String,
    default: "",
  },
  isAway: { // if the tenant leaves after the application is accepted or homeowner removes the tenant
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Application", applicationSchema);
