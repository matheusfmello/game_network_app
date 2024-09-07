const express = require('express');
const game_db = require('../db_models/game')
const router = express.Router()
const auth = require('../middlewares/auth');

router.get('/', async (req, res) => {
    
        try {
            const games = await game_db.aggregate([
                {
                    $addFields: {
                        averageGameplay: {$avg: '$ratings.gameplay'},
                        averageDifficulty: {$avg: '$ratings.difficulty'},
                        averageNarrative: {$avg: '$ratings.narrative'}
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
      const game = await game_db.findById(req.params.gameId);
      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }
      res.json(game);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

module.exports = router;