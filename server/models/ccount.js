const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AccountSchema = new Schema({
    name: String,
    lastName: String,
    email: String,
    password: String,
    city: String,
    subCity: String,
    woreda: String,
    kebele: String,
    phone: String,    
}, { timestamps: true })
module.exports = mongoose.model('Account',AccountSchema)