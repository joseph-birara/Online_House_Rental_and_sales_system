
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OwnerSchema = new Schema({  
    name: String,
    lastName: String,
    email: String,
    password: String,
    city: String,
    subCity: String,
    woreda: String,
    kebele: String,
    phone: String, 
    house: Array,
    aplicantId: {
        type: Array,
        default: []
    }, 
    saleId:{
        type: Array,
        default: []
    }, 
    rentId :{
        type: Array,
        default: []
    }, 
    
}, { timestamps: true })

module.exports = mongoose.model('HomeOwner',OwnerSchema)