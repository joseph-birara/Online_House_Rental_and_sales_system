require('dotenv').config({path:'./config/.env'});
const express = require('express');
const { default: mongoose } = require('mongoose');
const userRouts = require('./routes/adminRoutes')





//express app
const app = express()
app.use(express.json())// midleware

app.use((req, res, next) => {
    console.log(req.path, req.method,req.body)
    next()
})
//use routs 
app.use('/api/user', userRouts)

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


