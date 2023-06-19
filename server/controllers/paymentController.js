const paymentModel = require("../models/paymentModel");
const paymentMode = require("../models/paymentModel");

//functions to process pyment
const pay = async (req, res) => {
  const data = req.body;

  try {
    const payment = await paymentMode.create(data);
    return res.status(201).json(payment);
  } catch (error) {
    return res.status(501).json(error);
  }
};

const deletePayment = async (req, res) => {
  console.log("delete function called");
  //console.log(req);
  const id = req.query;
  try {
    const result = await paymentMode.findByIdAndDelete(id);
    if (!result) {
      return res.status(401).json({ message: "informtion not found" });
    }
  } catch (error) {
    return res.status(501).josn(error);
  }
};
const editPayment = async (req, res) => {
  let id = req.body.id;
  try {
    const updateResult = await paymentModel.updateOne(
      { _id: id },
      { ...req.body }
    );
    if (!updateResult) {
      return res.status(401).json({ message: "information not found " });
    }
  } catch (error) {
    return res.status(501).json(error);
  }
};

//retrive payment information

const getSingle = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await paymentModel.findById(id);
    if (!payment) {
      return res.status(401).json;
    }
  } catch (error) {}
};

module.exports = {
  pay,
  deletePayment,
  editPayment,
  getSingle,
};
