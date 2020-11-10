const express = require('express');
const router = express.Router();
const prove8Cont = require('../controllers/prove08');

router.get('/', prove8Cont.getMainPage);

router.post('/getProducts', prove8Cont.postGetJSON);

module.exports = router;
