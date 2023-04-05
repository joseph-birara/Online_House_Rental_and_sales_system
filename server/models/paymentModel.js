const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    amount: Number,
    reciepentID: ObjectId,
    homeID: ObjectId,
    payerID: ObjectId,
})

module.exports = mongoose.model('Payment', paymentSchema)

