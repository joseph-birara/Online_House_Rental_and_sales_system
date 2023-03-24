/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: APIs for managing admin accounts
 *
 * /admin/login:
 *   post:
 *     tags: [Admin]
 *     summary: Login an admin
 *     description: Login an admin using email and password to get an access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the admin
 *               password:
 *                 type: string
 *                 description: Password of the admin
 *             example:
 *               email: john@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Access token to be used for authentication
 *               example:
 *                 accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 * @swagger
 * /admin/all:
 *   get:
 *     tags: [Admin]
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
 *     tags: [Admin]
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
 *     tags: [Admin]
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
 *     tags: [Admin]
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
 *     tags: [Admin]
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
    updateAdmin,
    adminLogin 
} = require('../controllers/adminController')

const router = express.Router()
router.get('/all', getAllAdmins)
router.get('/get/:id',getAdmin)
router.post('/add', addAdmin)
router.delete('/delete/:id', deleteAdmin)
router.patch('/update/:id', updateAdmin)
router.post('/login', adminLogin)

module.exports = router
