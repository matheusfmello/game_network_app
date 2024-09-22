const bcrypt = require('bcrypt');
const express = require("express");
const jwt = require('jsonwebtoken');

const User = require('../db_models/user');

const router = express.Router();

const SECRET = 'jwt_secret';

router.post('/', async(req, res) => {

    const {username, password} = req.body;


    try {
        const user = await User.findOne({'username':username});
        if (!user) {
            return res.status(404).send('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            return res.status(404).send('Wrong password');
        }

        const token = jwt.sign({username:user.username, id:user._id}, SECRET, {expiresIn: '1h'});
        res.cookie(
            'token',
            token,
            {
                httpOnly:true,
                sameSite:'None',
                maxAge:3600000,
                secure: true
            }
        );
        return res.status(200).send('Login succesful');

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

module.exports = router;