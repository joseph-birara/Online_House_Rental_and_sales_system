// swager description

/**
 * @swagger
 * tags:
 *   name: Amenities
 *   description: APIs for managing Amenities
 * 
 * /amenities/all:
 *   get:
 *     tags: [Amenities]
 *     summary: Get all Amenities
 *     description: Returns a list of all Amenities with image URLs.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved list of all Amenities with image URLs.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/AmenitiesWithImage'
 *       400:
 *         description: Error retrieving list of all Amenities.
 * 
 * /amenities/single:
 *   get:
 *     tags: [Amenities]
 *     summary: Get a single Amenities
 *     description: Returns a single Amenities object by ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: id
 *         description: ID of the Amenities object to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved single Amenities object.
 *         schema:
 *           $ref: '#/definitions/Amenities'
 *       400:
 *         description: Error retrieving single Amenities object.
 * 
 * /amenities/add:
 *   post:
 *     tags: [Amenities]
 *     summary: Add Amenities to a house
 *     description: Adds a new Amenities object to the database for a house.
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Data for the new Amenities object to be added.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Amenities'
 *     responses:
 *       200:
 *         description: Successfully added new Amenities object.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "you have added amenities to your house"
 *       400:
 *         description: Error adding new Amenities object.
 * 
 * /amenities/delete:
 *   delete:
 *     tags: [Amenities]
 *     summary: Delete an Amenities object
 *     description: Deletes an Amenities object from the database by ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: id
 *         description: ID of the Amenities object to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted Amenities object.
 *         schema:
 *           $ref: '#/definitions/Amenities'
 *       400:
 *         description: Error deleting Amenities object.
 * 
 * /amenities/update:
 *   put:
 *     tags: [Amenities]
 *     summary: Update an Amenities object
 *     description: Updates an existing Amenities object in the database.
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Data for the updated Amenities object.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Amenities'
 *     responses:
 *       200:
 *         description: udated succesfully
 *       
 *       400:
 *          description: Error no such amnenities.
 * 
 * 
 */       


// import the controllers
const {
addAmenities,
    getAllAmenitiess,
    getAmenities,
    deleteAmenities,
   updateAmenities,
} = require('../controllers/amenitiesController')
const express = require('express')
const router = express.Router()

// create the routeres
router.get('/all',getAllAmenitiess)
router.get('/single', getAmenities)
router.post('/add', addAmenities)
router.delete('/delete', deleteAmenities)
router.put('/update', updateAmenities)


module.exports = router


