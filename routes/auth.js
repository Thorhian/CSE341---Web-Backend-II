const express = require('express');

const authCont = require('../controllers/auth');

const router = express.Router();

router.get('/login', authCont.getLoginPage);

router.post('/login', authCont.postLogin);

router.get('/createUser', authCont.getCreateUser);

router.post('/createUser', authCont.postCreateUser);

module.exports = router;
