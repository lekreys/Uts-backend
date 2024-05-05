const express = require('express');
const routerr = express.Router();
const dosenController = require('../controllers/dosenController');



routerr.get('/' , dosenController.homepage);

routerr.get('/add' , dosenController.addCustomer);
routerr.post('/add' , dosenController.postCustomer);

routerr.get('/view/:id' , dosenController.view);
routerr.get('/edit/:id' , dosenController.edit);
routerr.put('/edit/:id', dosenController.editPost);
routerr.delete('/edit/:id', dosenController.deleteCustomer);

routerr.post('/search', dosenController.searchCustomers);

















module.exports = routerr;
