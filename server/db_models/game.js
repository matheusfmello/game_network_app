const mongoose = require('mongoose');

const GameRatingsSchema = mongoose.Schema({
    'username': {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    'gameplay': {type: Number, min:0, max:100},
    'difficulty': {type: Number, min:0, max:100},
    'narrative': {type: Number, min:0, max:100}
})

const GameSchema = mongoose.Schema({
    'title': {type: String, required: true},
    'console': String,
    'producer': String,
    'year': Number,
    'description': String,
    'image': String,
    'ratings': [GameRatingsSchema]
})

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;