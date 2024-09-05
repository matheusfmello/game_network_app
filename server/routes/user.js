const express = require('express');
const User = require('../db_models/user');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/:username',  async (req, res) => {

    const username = req.params.username

    if (!username) {
        return res.status(400).send({error: 'Username required'});
    }
    try {
        const user = await User.findOne({'username':username})
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(204).send("No user found");
        }

    } catch (error) {
        res.status(404).send(error);    
    }
})

router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put('/:username', auth, async(req, res) => {
    try {
        const username = req.params.username;
        const update_data = req.body;
        const updatedUser = await User.findOne(username, update_data, {new:true});
        res.json(updatedUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/:id', auth, async(req, res) => {
    try {
        const user_id = req.params.id;
        user = await User.findByIdAndDelete(user_id);
        res.status(204)
    } catch (error) {
        res.status(404).send(error.message);
    }
    
})

router.put('/:id/friend', async(req, res) => {
    try {
        const user_id = req.params.id;
        const friend_id = req.body;
        const user = await User.findById(user_id);
        const friend = await User.findById(friend_id)
        user.friends.push(friend_id);
        friend.friends.push(user_id);
        await user.save();
        await friend.save();
        res.json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;