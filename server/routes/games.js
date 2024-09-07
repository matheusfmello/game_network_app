const express = require('express');
const game_db = require('../db_models/game')
const mongoose = require('mongoose');
const router = express.Router()
const auth = require('../middlewares/auth');

router.get('/', async (req, res) => {
    
        try {
            const games = await game_db.aggregate([
                {
                    $addFields: {
                        averageGameplay: {$avg: {$ifNull: ['$ratings.gameplay', 50]} },
                        averageDifficulty: {$avg: { $ifNull: ['$ratings.difficulty', 50]}},
                        averageNarrative: {$avg: { $ifNull: ['$ratings.narrative', 50]}},
                    }
                }
            ]);
            res.json(games)
        } catch(err)  {
            console.error(err);
            res.status(500).send('Server error');
        };
})

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

router.get('/:gameId/user', auth, async (req, res) => {
    /**
     * Return the information of that game associated to the logged user.
     */
    try {
        const game = await game_db.findOne(
          { _id: req.params.gameId, 'ratings.username': req.user.id },
          { 'ratings.$': 1 }
        );
    
        if (!game || game.ratings.length === 0) {
          return res.json({
            gameplay: 50,
            difficulty: 50,
            narrative: 50,
          });  // Default values if user hasn't rated the game yet
        }
    
        const { gameplay, difficulty, narrative } = game.ratings[0];
        res.json({ gameplay, difficulty, narrative });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
    });

module.exports = router;