require('dotenv').config({path:'./config/.env'});
const express = require('express');
const { default: mongoose } = require('mongoose');
const userRouts = require('./routes/adminRoutes')
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const YAML = require('yamljs');
const swaggerOptions = require('./swaggerOptions');

const bodyParser = require('body-parser')


//express app
const app = express()
app.use(express.json())// midleware
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(req.path, req.method,req.body)
    next()
})

const swaggerDocs = swaggerJSDoc(swaggerOptions);
//swagger midlware 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//use routs 
app.use('/admin', userRouts)
// conslo swagger
// console.log(JSON.stringify(swaggerDocument, null, 2));

// conect to db
mongoose.connect(process.env.DB_URL)
    .then(() => {
        //listen for requests

app.listen(4000, () => {
    console.log('listening to port',process.env.PORT)
})
    
    })
    .catch((err) => {
        console.log(err)
        
    })



