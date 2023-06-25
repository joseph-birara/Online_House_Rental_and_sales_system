class PaymentControl {
  constructor(applicationId) {
    this.applicationId = applicationId

    setTimeout(() => {
      console.log("The id is : " + this.applicationId);
      
    }, 2000); // Delayed execution after 1 minute (60 seconds * 1000 milliseconds)

  }
}


// Creating an instance of the Person class
const pay = new PaymentControl("11111111111111111111111")
console.log('here is out side the class')
const pay3 = new PaymentControl("444444444444444444444")
