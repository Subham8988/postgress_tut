const express=require('express');
const  routes = express.Router();
const user_controller = require('../controller/user_Controller')

 routes.post('/addUser',user_controller.addUser)
module.exports = routes
