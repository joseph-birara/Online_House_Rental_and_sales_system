/**
 * @swagger
 * /api/admin:
 *   get:
 *     summary: Returns a list of users
 *     description: Get a list of all user admins 
 *     responses:
 *       200:
 *         description: A list of admins
 */
/**
 * @swagger
 * /api/admin:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new admin with the specified information
 *     requestBody:
 *       description: User information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       201:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       400:
 *         description: Invalid user information provided
 */

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
