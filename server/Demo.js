const applicationModel = require("./models/applicantModel");
class PaymentControl {
  constructor(applicationId) {
    this.applicationId = applicationId;

    setTimeout(async () => {
      const updatedApp = await applicationModel.findById(applicationId);
      if (
        updatedApp.status == "accepted" &&
        updatedApp.paymentStatus == false
      ) {
        updatedApp.status = "completed";
        await updatedApp.save();
      }
      console.log("The id is : " + this.applicationId);
    }, 2000); // Delayed execution after 1 minute (60 seconds * 1000 milliseconds)
  }
}

const callMethod = (applicationId) => {
  const RUN_Class = new PaymentControl(applicationId);
};

module.exports = callMethod;
