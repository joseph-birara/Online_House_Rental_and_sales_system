const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminSchema = new Schema({
    name: String,
    lastName: String, 
    phone: String,
    email: String,
    image: String,
    password: String,
    superAdmin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

module.exports = mongoose.model('Admin',AdminSchema)