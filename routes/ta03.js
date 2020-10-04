//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();
const Items = require('../models/items')

router.get('/', (req, res, next) => {
    const items = new Items();
    items.getItems((err, data) => {
        if (err) {
            console.log('Could not read file.');
            console.log(err);
            res.end();
        } else {
            const itemsData = JSON.parse(data);
            console.log(itemsData);
            res.render('pages/ta03', {
                title: 'Team Activity 03',
                path: '/ta03', // For pug, EJS
                activeTA03: true, // For HBS
                contentCSS: true, // For HBS
                itemsData: itemsData,
            });
        }
    });
});

router.post('/', (req, res, next) => {
    const searchQuery = req.body.searchQuery;
    const items = new Items();
    items.getItems((err, data) => {
        if (err) {
            console.log('Could not read file.');
            console.log(err);
            res.end();
        } else {
            const itemsData = JSON.parse(data);
            const foundItems = [];
            let searchIndex = 0;

            while (searchIndex >= 0) {
                searchIndex = itemsData.findIndex(searchQuery);
                if (searchIndex >= 0) {
                    foundItems.push(itemsData[searchIndex]);
                    itemsData.splice()
                }
            }
            console.log(itemsData);
            res.render('pages/ta03', {
                title: 'Team Activity 03',
                path: '/ta03', // For pug, EJS
                activeTA03: true, // For HBS
                contentCSS: true, // For HBS
                itemsData: itemsData,
            });
        }
    });
});

module.exports = router;
