const {
    addApplicationRequest,
    getAllApplictions,
    getOwnerApplications,
    getTenantApplications,
    getHouseApplications,
    getSingleApplication,
    updateAppliction,
    deleteApplication



} = require('../controllers/applicationController')

const express = require('express')
const router = express.Router()

router.get('/byOwner', getOwnerApplications)
router.get('/byTenant', getTenantApplications)
router.get('/byHouse', getHouseApplications)
router.get('/single', getSingleApplication)
router.post('/send', addApplicationRequest)
router.get('/all', getAllApplictions)
router.delete('/delete', deleteApplication)
router.put('/update',updateAppliction)



module.exports = router