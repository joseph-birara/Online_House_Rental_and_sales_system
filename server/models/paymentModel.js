const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    amount: Number,
    reciepentId: ObjectId,
    homeId: ObjectId,
    payerID: ObjectId,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
