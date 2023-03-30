
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
    house: Array,
    aplicationId: {
        type: Array
    }, 
    boughtID:{
        type: Array
    }, 
    rentId :{
        type: Array
    }, 
}, { timestamps: true })


module.exports = mongoose.model('Tenant', tenantSchema)
