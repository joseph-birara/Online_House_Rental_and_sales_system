const express = require("express");
const router = express.Router();

const {
  pay,
  deletePayment,
  editPayment,
  getSingle,
} = require("../controllers/paymentController");
const { route } = require("./commentRoutes");

router.post("/pay", pay);

module.exports = router;
