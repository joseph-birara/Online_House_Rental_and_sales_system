require('dotenv').config({path:'./config/.env'});
const express = require('express');
const { default: mongoose } = require('mongoose');
const userRousts = require('./routes/userRouts')




//express app
const app = express()
app.use(express.json())
// midleware

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})





//use routs 
app.use('/api/user',userRousts)


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

