const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');
const routeAuth = require('../util/auth');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', routeAuth.loginAuth, shopController.getCart);

router.post('/cart', routeAuth.loginAuth, shopController.postCart);

router.post('/cart-delete-item', routeAuth.loginAuth, shopController.postCartDeleteProduct);

router.post('/create-order', routeAuth.loginAuth, shopController.postOrder);

router.get('/orders', routeAuth.loginAuth, shopController.getOrders);

module.exports = router;
