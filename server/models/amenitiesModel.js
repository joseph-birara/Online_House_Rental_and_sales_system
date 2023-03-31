
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const AmenitiesSchema = new Schema({  
houseID: ObjectId,       
    washer: Boolean,
    wifi: Boolean,
    airConditioning: Boolean,
    freezer: Boolean,
    dryer: Boolean,
    workSpace: Boolean,
    gym: Boolean,
    heater: Boolean,
    pool: Boolean,
    terrace: Boolean,
    parking:Boolean    
    
}, { timestamps: true })


module.exports = mongoose.model('Amenities', AmenitiesSchema)
