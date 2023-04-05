const mongoose = require('mongoose')

const rentSchema = new mongoose.Schema({
    duration: String,
    startDate: Date,
    endDate: Date,
    paymentAmount: Number,
    paymentStatus:String,
    
    tenantID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant'
    }], 
    ownerID:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HomeOwner'
    }], 
    homeID:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Houses'
    }], 
})