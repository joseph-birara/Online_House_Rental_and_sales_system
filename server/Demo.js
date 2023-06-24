class PaymentControl {
    // constructor(name, age) {
    //     this.name = name;
    //     this.age = age;
    // }

    checkPaymentStatus(name) {
        setTimeout(() => {
            console.log("Name is : " + name);
            this.RUN_THIS_After_SOME_TIME()
        }, 3000); // Delayed execution after 1 minute (60 seconds * 1000 milliseconds)
    }

    RUN_THIS_After_SOME_TIME() {
        console.log("part of this code is run ----------- doen.")
    }

}

// Creating an instance of the Person class
const pay = new PaymentControl();
pay.checkPaymentStatus('Dawit andargachew and jossy are here.')
// pay.RUN_THIS_After_SOME_TIME()
