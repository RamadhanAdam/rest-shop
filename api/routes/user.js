const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const bcrypt = require('bcrypt')
const User = require('../models/user');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

router.post('/signup', (req, res, next) => {

    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result)
                                res.status(200).json({
                                    message: "User created"
                                })
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })

            }

        })

});

router.post('/login', (req, res, next) => {

    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            // Check if no users are found (i.e., the array is empty)
            if (user.length < 1) {
                res.status(401).json({
                    message: "Auth failed"
                })
            }
            //else try to check for password
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) { //if error happens
                    return res.status(401).json({
                        message: "Auth failed!"
                    })
                }
                // If passwords do not match
                if (!result) {
                    return res.status(401).json({
                        message: "Auth failed!"
                    });
                }

                // If password matches

                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                },
                    process.env.JWT_KEY, {
                    expiresIn: '1h'
                },

                );

                return (res.status(200).json({
                    message: "Auth successful",
                    token: token
                }));
            }
            )
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})


router.delete('/:UserId', (req, res, next) => {

    User.deleteOne({ _id: req.params.UserId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User Deleted"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router;