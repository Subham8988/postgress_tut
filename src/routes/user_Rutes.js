const express = require('express');
const routes = express.Router();
const user_controller = require('../controller/user_Controller')

routes.post('/addUser', user_controller.addUser);

// form   api url routes
routes.post('/formdata/:form_name', user_controller.formData);
routes.get('/formdata/:form_name', user_controller.get_form_data)
routes.get('/formdata-list', user_controller.form_list)
routes.delete('/formdata/:form_name',user_controller.delete_form)
module.exports = routes
