const express = require('express');
const router = express.Router();
const Users = require('../schemas/user')
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = 'memorygame';

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return (
                res.status(400).send({
                    errorMessage: "Username and Password cannot be empty"
                })
            )
        }
        const user = await Users.findOne({ username })
        if (!user) {
            const newUser = await Users.create({
                username, password,role:"player"
            })

            return (
                res.status(200).send({
                    message: "success",
                    newUser
                })
            )
        } else {
            return res.status(400).send({
                errorMessage: 'Username already exist',
            })
        }

    } catch (error) {
        return res.status(400).send({
            errorMessage: error.message
        })
    }

})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return (
                res.status(400).send({
                    errorMessage: "Username and Password cannot be empty"
                })
            )
        }
        const user = await Users.findOne({ username, password })
        if (user) {
            const token = jwt.sign({user}, JWT_SECRET_KEY, {
                expiresIn: '2 days',
            });

            return (
                res.status(200).send({
                    username: user.username,
                    role: user.role,
                    token
                })
            )
        } else {
            return res.status(400).send({
                errorMessage: 'User not found',
            })
        }
    } catch (error) {
        return res.status(400).send({
            errorMessage: error.message
        })
    }
})

module.exports = router;