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
  applicationType: String,
});

module.exports = mongoose.model("Application", applicationSchema);
