/**
 * @swagger
 * /admin/all:
 *   get:
 *     summary: Get all admins
 *     description: Retrieve a list of all admins.
 *     responses:
 *       200:
 *         description: A list of admin objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 * /admin/add: 
 *   post:
 *     summary: Create a new admin
 *     description: Create a new admin with the given information.
 *     requestBody:
 *       description: Admin object that needs to be added
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       201:
 *         description: Admin created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *
 * /admin/get{id}:
 *   get:
 *     summary: Get an admin by ID
 *     description: Retrieve an admin with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the admin to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An admin object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 * /admin/update:
 *   patch:
 *     summary: Update an admin
 *     description: Update an admin with the given information.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the admin to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Admin object that needs to be updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 * /admin/delete:
 *
 *   delete:
 *     summary: Delete an admin by ID
 *     description: Delete an admin with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the admin to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Admin deleted successfully
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


router.get('/all', getAllAdmins)
router.get('/get/:id',getAdmin)
router.post('/add', addAdmin)
router.delete('/delete/:id', deleteAdmin)
router.patch('/update/:id', updateAdmin)

module.exports = router
