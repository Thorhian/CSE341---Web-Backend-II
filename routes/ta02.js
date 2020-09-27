//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const express = require('express');
const router = express.Router();

const userList = ['Mat', 'Thorhian', 'AMPDESU'];

router.get('/',(req, res, next) => {
    console.log(req.session.delUserFailed);
    res.render('pages/ta02', {
        title: 'Team Activity 02', 
        path: '/ta02', // For pug, EJS
        users: userList,
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
        delUser: req.session.delUserFailed,
    });
    if (req.session.delUserFailed === true) {
        console.log('Setting var to false.');
        req.session.delUserFailed = false;
    }
});

router.post('/addUser', (req, res, next) => {
    const newUserName = req.body.newUser;
    if (userList.indexOf(newUserName) === -1) {
        userList.push(newUserName);
        res.redirect('/ta02');
    } else {
        res.send('<h1>Cannot add user, username is already taken.</h1>');
        res.end;
    }

});

router.post('/removeUser', (req, res, next) => {
    const delUserName = req.body.dUserName;
    const foundIndex = userList.indexOf(delUserName);
    if (foundIndex > -1) {
        userList.splice(foundIndex, 1);
        res.redirect('/ta02');
    } else {
       // req.session.delUserFailed = true;
        res.send('<h1>Could not find user</h1>');
        res.end();
    }

});

module.exports = router;
