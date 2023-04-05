const { ObjectId, Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const MaintenanceSchema = new mongoose.Schema(
    {
        homeID: {
            type: mongoose.Schema.Types.ObjectId,
        ref: 'Houses'
        },
        ownerID: {
            type: mongoose.Schema.Types.ObjectId,
        ref: 'HomeOwner'
        },
        tenantID: {
            type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant'
        },
        message: String,
        

    },{Timestamp: true}
)

module.exports = mongoose.model("Mainenance",MaintenanceSchema)