const express = require('express');
const app = express();
const dbConfig =require('./config/db_Config');
const user_routes = require('./routes/user_Rutes');
const cors = require('cors')
app.use(express.json());


// corss  issue allow all origin
app.use(cors({
 origin :'http://localhost:4200'
}))


// route define for form 
app.use('/users/api/v1/postgres/form',user_routes)


// checking application runing fine or not  
app.get('',async ( req,res)=>{
    try {
        res.status(200).send(`Working Fine`)
    } catch (error) {
        res.status(500).send(`${error}`)
    }
})

module.exports = app;