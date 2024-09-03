const express = require('express');
const User = require('../db_models/user');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth,  async (req, res) => {  // add auth
    username = req.user.username
    try {
        const user = await User.findOne({'username':req.user.username})
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send(error);    
    }
})

module.exports = router;