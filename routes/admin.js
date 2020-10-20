const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const routeAuth = require('../util/auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', routeAuth.loginAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', routeAuth.loginAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', routeAuth.loginAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', routeAuth.loginAuth, adminController.getEditProduct);

router.post('/edit-product', routeAuth.loginAuth, adminController.postEditProduct);

router.post('/delete-product', routeAuth.loginAuth, adminController.postDeleteProduct);

module.exports = router;
