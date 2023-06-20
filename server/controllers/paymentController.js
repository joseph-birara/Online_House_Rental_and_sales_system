const paymentModel = require("../models/paymentModel");
var request = require("request");

//functions to process pyment
const pay = async (req, res) => {
  var options = {
    method: "POST",
    url: "https://api.chapa.co/v1/transaction/initialize",
    headers: {
      Authorization: "Bearer CHASECK-xxxxxxxxxxxxxxxx",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: "100",
      currency: "ETB",
      email: "abebech_bekele@gmail.com",
      first_name: "Bilen",
      last_name: "Gizachew",
      phone_number: "0912345678",
      tx_ref: "chewatatest-6669",
      callback_url: "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
      return_url: "https://www.google.com/", // order
      "customization[title]": "Payment for my favourite merchant",
      "customization[description]": "I love online payments",
    }),
  };
  request(options, function (error, response) {
    if (error) {
      console.log(error);
    }
    console.log(response.body);
  });
  // user identify by the cookie

  // sending request saving the textref with user

  // accept the payment link

  /// send to the front end

  // sending the textref parameter with the hee=ader beare token secrect key
  // const data = req.body;

  // try {
  //   const payment = await paymentMode.create(data);
  //   return res.status(201).json(payment);
  // } catch (error) {
  //   return res.status(501).json(error);
  // }
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
