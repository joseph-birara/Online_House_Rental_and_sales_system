
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const HomeSchema = new Schema({  
ownerID: ObjectId,
    image:Array,    
    password: String,
    city: String,
    subCity: String,
    woreda: String,
    kebele: String,
    price: Float,
    homeStatus : String
}, { timestamps: true })


module.exports = mongoose.model('Home', HomeSchema)
