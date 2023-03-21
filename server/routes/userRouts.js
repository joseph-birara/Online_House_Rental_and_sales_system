const express = require('express')


const Admin = require('../models/adminModel')
const router = express.Router()


router.get('/', (req, res) => {
    res.json({mssg:"it is working fine"})
})
router.post('/', async (req, res) => {
    const { name, lastName, age } = req.body
    
    try {
        const admin = await Admin.create({ name, lastName, age })
        res.status(200).json(admin)
        console.log(req.body)
        
    } catch (err) {
        res.status(400).json({error:err.message})
    }
    
})

module.exports = router
