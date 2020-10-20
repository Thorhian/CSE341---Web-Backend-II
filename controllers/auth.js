const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.getLoginPage = (req, res, next) => {
    if(req.session.User) {
        res.redirect('/shop');
    } else {
        res.render('pages/shop/login', {
            pageTitle: 'Login',
            path: '/auth/login'
        });
    }
};

exports.postLogin = (req, res, next) => {
    const inputUsername = req.body.username;
    const inputPassword = req.body.password;

    User.findByUsername(inputUsername)
        .then(userFromDB => {
            if(userFromDB) {
                if(userFromDB.name == inputUsername) {
                    bcrypt.compare(inputPassword, userFromDB.password, (err, result) => {
                        if(result == true) {
                            req.session.user = userFromDB;
                            res.redirect('/shop')
                        } else {
                            res.redirect('/auth/login');
                        }
                    });

                } else {
                    res.redirect('/auth/login');
                    return;
                }
            } else {
                res.redirect('/auth/login');
                return;
            }
        })
        .catch(err => console.log(err));
};

exports.getCreateUser = (req, res, next) => {
    res.render('pages/shop/createUser', {
        pageTitle: 'Create New User',
        path: '/auth/createUser'
    });
};

exports.postCreateUser = (req, res, next) => {
    const newUsername = req.body.username;
    const newPassword = req.body.password;
    const newEmail = req.body.email;
    const saltRounds = 12;

    if(!newUsername || !newPassword || !newEmail) {
        console.log('Parameters missing...');
        res.redirect('/auth/createUser');
        return;
    }

    User.findByUsername(newUsername)
        .then(isTaken => {
            if(isTaken) {
                console.log('Username taken...');
                console.log(isTaken);
                res.redirect('/auth/createUser');
                return;
            } else {
                bcrypt.hash(newPassword, saltRounds, (err, hashResult) => {
                    if (err) {
                        console.log('Warning, hash function failed.');
                        console.log(err);
                        res.redirect('/');
                        return;
                    }

                    const newUser = new User(newUsername, newEmail, hashResult, []);
                    newUser.save();
                    res.redirect('/auth/login');
                });
            }
        })
        .catch(err => console.log(err));
};
