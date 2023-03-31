const express = require('express');
const router = express.Router();
const upload = require('../imagesHandler/multipleImage');
const addHouse = require('../controllers/houseController');

router.post('/add', upload('House'), addHouse);

module.exports = router;
