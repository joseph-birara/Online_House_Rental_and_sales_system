//swagger documentaion
/**
 * @swagger
 * tags:
 *   name: Rent
 *   description: APIs for managing rental information
 * 
 * /rent/delete:
 *   delete:
 *     tags: [Rent]
 *     summary: Delete rent information
 *     description: Deletes the rent information.
 *     responses:
 *       201:
 *         description: Rent information deleted successfully.
 *       400:
 *         description: No rent information found.
 *       404:
 *         description: Rent information not found.
 */
/**
 * @swagger
 * /rent/getById{id}:
 *   get:
 *     tags: [Rent]
 *     summary: Get rent information by ID
 *     description: Retrieve rent information by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the rent information to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rent information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rent'
 *       400:
 *         description: Empty list
 *       404:
 *         description: Rent information not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /rent/all:
 *   get:
 *     tags:
 *       - Rent
 *     summary: Get all rent information
 *     description: Returns all rent information stored in the database.
 *     responses:
 *       200:
 *         description: Returns an array of rent information
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rent'
 *       400:
 *         description: No rent information found
 *       404:
 *         description: Error occurred while retrieving rent information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
/**
 * @swagger
 * /rent/add:
 *   post:
 *     tags:
 *       -  Rent
 *         
 *     summary: Add a new rent information
 *     description: Adds a new rent information to the database and updates the corresponding tenant and owner records with the new rent id.
 *     requestBody:
 *       description: Rent object that needs to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rent'
 *     responses:
 *       201:
 *         description: Rent information added successfully
 *       404:
 *         description: Failed to add rent information
 */







//import all controller functions
const {
    addRentInformation, getRentInformationByID, getAllRent, deleteRentInformation,
    
} = require('../controllers/rentController')

const express = require('express')
const router = express.Router()

//define the routes 
router.get('/getById', getRentInformationByID)
router.get('/all', getAllRent)
router.post('/add', addRentInformation)
router.delete('/delete/:id',deleteRentInformation)


module.exports = router