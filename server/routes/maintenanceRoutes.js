const {
    sendMaintenance,
    editMaintenace,
    deleteMaintenace,
     getMaintenance,
    getSingleMaintenance
} = require('../controllers/maintenanceController')


const express = require('express')
const { route } = require('./tenantRoutes')
const router = express.Router()

router.post('/send', sendMaintenance)
router.put('/edit', editMaintenace)
router.delete('/delete', deleteMaintenace)
router.get('/singel', getSingleMaintenance)
router.get('/all',getMaintenance)


module.exports= router