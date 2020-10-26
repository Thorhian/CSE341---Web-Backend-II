const express = require('express');
const { body, validation, validationResult } = require('express-validator');

const authCont = require('../controllers/auth');

const router = express.Router();

router.get('/login', authCont.getLoginPage);

router.post('/login', [
    body('username').exists(),
    body('password').exists()
], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.redirect('/auth/login');
    } else {
        next();
    }
}, authCont.postLogin);

router.get('/logout', authCont.getLogout);

router.get('/createUser', authCont.getCreateUser);

router.post('/createUser', [
    body('email').isEmail(),
    body('username').exists,
    body('password').isLength({ min: 5 })
], (req,res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.redirect('/auth/createUser');
    } else {
        next();
    }
}, authCont.postCreateUser);

module.exports = router;
