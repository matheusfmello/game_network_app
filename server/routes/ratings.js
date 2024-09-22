const express = require('express');
const game_db = require('../db_models/game')
const mongoose = require('mongoose');
const router = express.Router()
const auth = require('../middlewares/auth');

router.get('/:gameId', async (req, res) => {
    try {
      const game = await game_db.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(req.params.gameId) } },
        {
          $addFields: {
            averageGameplay: {$avg: {$ifNull: ['$ratings.gameplay', 50]} },
            averageDifficulty: {$avg: { $ifNull: ['$ratings.difficulty', 50]}},
            averageNarrative: {$avg: { $ifNull: ['$ratings.narrative', 50]}},
          }
        }
      ]);
  
      if (!game || game.length === 0) {
        return res.status(404).json({ message: 'Game not found' });
      }
  
      res.json(game[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

  // User ratings

router.get('/:gameId/user', auth, async (req, res) => {
/**
 * Return the information of that game associated to the logged user.
 */
try {
    const game = await game_db.findOne(
        { _id: req.params.gameId, 'ratings.username': req.user.id },
        { 'ratings.$': 1 }
    );

    const user_ratings = game.ratings[0];

    if (!user_ratings || user_ratings.length == 0) {
        return res.json({
        'gameplay': 50,
        'difficulty': 50,
        'narrative': 50,
        });  // Default values if user hasn't rated the game yet
    }
    res.json({ 'gameplay':user_ratings.gameplay, 'difficulty':user_ratings.difficulty, 'narrative':user_ratings.narrative });
    } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
    }
});


router.post('/:gameId/user', auth, async(req, res) => {

    try {
        const { gameplay, difficulty, narrative } = req.body;
        const game = await game_db.findById(req.params.gameId)
        const existingRating = game.ratings.find(rating => rating.username.toString() === userId);

        if (existingRating) {
            existingRating.gameplay = gameplay;
            existingRating.difficulty = difficulty;
            existingRating.narrative = narrative;
        } else {
            game.ratings.push({
                'username': req.user.id,
                'gameplay': gameplay,
                'difficulty': difficulty,
                'narrative': narrative
            });
        }
        await game.save();
        res.status(201).send('Rating submitted succesfully');


    } catch (error) {
        res.status(404).send(error);
    }
});


module.exports = router;