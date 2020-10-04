const express = require('express');
const router = express.Router();
const path = require('path');
const prove01Cont = require('../controllers/prove01');

router.get('/', prove01Cont.get);

router.post('/input', prove01Cont.post);

module.exports = router;
