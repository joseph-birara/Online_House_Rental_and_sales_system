const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  amount: Number,
  reciepentId: ObjectId,
  homeId: ObjectId,
  payerID: ObjectId,
});

module.exports = mongoose.model("Payment", paymentSchema);
