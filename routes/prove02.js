const express = require('express');
const router = express.Router();

const bookNames = [];
const bookSums = [];

router.get('/', (req, res, next) => {
    let containsBooks = false;
    if (bookNames.length > 0) {
        containsBooks = true;
    }
    res.render('pages/prove02', {
        bookNames: bookNames,
        bookSums: bookSums,
        displayDelete: containsBooks
    });
    return res.end();
});

router.post('/add_book', (req, res, next) => {
    const bookName = req.body.bookName;
    const bookSum = req.body.bookSummary;
    bookNames.push(bookName);
    bookSums.push(bookSum);
    res.redirect('/prove02/');
    res.end();
});

router.post('/remove_book', (req, res, next) => {
    const bookName = req.body.bookName;
    const bookIndex = bookNames.indexOf(bookName);
    if (bookIndex > -1) {
        bookNames.splice(bookIndex, 1);
        bookSums.splice(bookIndex, 1);
        res.redirect('/prove02/');
        res.end();
    } else {
        res.send('<h1>Book could not be deleted, not found.');
        res.redirect('/prove02/');
        res.end();
    }
});

module.exports = router;
