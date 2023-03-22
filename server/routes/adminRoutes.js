const express = require('express')
const Admin = require('../models/adminModel')
const {
    addAdmin,
    getAllAdmins,
    getAdmin,
    deleteAdmin,
    updateAdmin
} = require('../controllers/adminController')
const router = express.Router()


router.get('/', getAllAdmins)
router.get('/:id',getAdmin)
router.post('/', addAdmin)
router.delete('/:id', deleteAdmin)
router.patch('/:id',updateAdmin)

module.exports = router
