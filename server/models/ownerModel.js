
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OwnerSchema = new Schema({  
    name: String,
    lastName: String,
    image:String,
    email: String,
    password: String,
    city: String,
    subCity: String,
    woreda: String,
    kebele: String,
    phone: String, 
    house: Array,
    aplicantId: {
        type: Array
    }, 
    saleId:{
        type: Array
    }, 
    rentId :{
        type: Array
    }, 
}, { timestamps: true })


module.exports = mongoose.model('HomeOwner', OwnerSchema)
