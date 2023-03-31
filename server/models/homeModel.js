
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
    price: Number,
    homeStatus: String,
    verified: Boolean,
    suspended: Boolean,
    area: Number,
    descreption: String,
    HomeType: String,
    bedRoom: Number,
    bathRoom: Number,    
}, { timestamps: true })


module.exports = mongoose.model('Houses', HomeSchema)
