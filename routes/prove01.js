const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('pages/prove01');
    return res.end();
});

router.post('/input', (req, res, next) => {
    const userData = req.body.userInput;
    res.render('pages/prove01Input', {userInput: userData});
    return res.end()
});

module.exports = router;
