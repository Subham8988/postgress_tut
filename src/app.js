const express = require('express');
const app = express();
const dbConfig =require('./config/db_Config');
const user_routes = require('./routes/user_Rutes');
app.use(express.json());

app.use('/users/api/v1/postgres',user_routes)



module.exports = app;