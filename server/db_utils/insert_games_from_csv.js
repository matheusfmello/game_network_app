const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const Game = require('../db_models/game');
const connectDB = require('../db_connection');

// Connect to MongoDB
connectDB();

const importCSV = () => {
  const results = [];

  fs.createReadStream('../data/games_data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      // Iterate over the results and insert into MongoDB
      results.forEach(async (gameData) => {
        const newGame = new Game({
          title: gameData.Title,
          year: parseInt(gameData.Year),
          description: gameData.Description,
          image: gameData.Image
        });
        try {
          await newGame.save();
          console.log(`Inserted: ${newGame.title}`);
        } catch (err) {
          console.error(`Error inserting ${newGame.title}:`, err.message);
        }
      });
    });
};

importCSV();
