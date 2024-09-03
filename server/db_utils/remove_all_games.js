const mongoose = require('mongoose');
const connectDB = require('../db_connection.js'); 
const Game = require('../db_models/game'); // Adjust the path accordingly

const removeAllGames = async () => {
    try {
        await connectDB();
        await Game.deleteMany({});
        console.log('All game records have been removed');
        mongoose.connection.close();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

removeAllGames();