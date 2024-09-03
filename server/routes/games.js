const express = require('express');
const game_db = require('../db_models/game')
const router = express.Router()

router.get('/', async (req, res) => {
    const games = await game_db.find({})
        .then(games => {
            res.json(games)
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Server error');
        });
})

module.exports = router;