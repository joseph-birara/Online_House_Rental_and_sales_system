
const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const tenantSchema = new Schema({  
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
    
    applicationId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant'
    }], 
    saleId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sale'
    }], 
    rentId :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rent'
    }], 
}, { timestamps: true })


module.exports = mongoose.model('Tenant', tenantSchema)
