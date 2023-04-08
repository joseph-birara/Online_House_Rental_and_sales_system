
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
    accountStatus:String,
    house: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Houses'
    }],
    applicationId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }], 
    saleId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sale'
    }], 
    rentId :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rent'
    }], 
    requestId :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Maintenance'
    }],
}, { timestamps: true })


module.exports = mongoose.model('HomeOwner', OwnerSchema)
