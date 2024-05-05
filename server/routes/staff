const express = require('express');
const routerr = express.Router();
const staffController = require('../controllers/staffController');



routerr.get('/' , staffController.homepage);

routerr.get('/add' , staffController.addCustomer);
routerr.post('/add' , staffController.postCustomer);

routerr.get('/view/:id' , staffController.view);
routerr.get('/edit/:id' , staffController.edit);
routerr.put('/edit/:id', staffController.editPost);
routerr.delete('/edit/:id', staffController.deleteCustomer);

routerr.post('/search', staffController.searchCustomers);

















module.exports = routerr;
