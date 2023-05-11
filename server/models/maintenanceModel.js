const { ObjectId, Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const MaintenanceSchema = new mongoose.Schema(
  {
    homeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Houses",
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HomeOwner",
    },
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
    },
    message: String,
    fixStatus: String,
  },
  { Timestamp: true }
);

module.exports = mongoose.model("Maintenance", MaintenanceSchema);
