const express = require('express');
const router = express.Router();
const prv02Cont = require('../controllers/prove02');


router.get('/', prv02Cont.rootGet);

router.post('/add_book', prv02Cont.addBookPost);

router.post('/remove_book', prv02Cont.removeBookPost);

module.exports = router;
