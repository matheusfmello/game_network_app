const Game = require('../db_models/game');
const User = require('../db_models/user');
const connectDB = require('../db_connection');

// Connect to MongoDB
connectDB();

async function insertUserRating() {
  try {
    const user = await User.findOne({ username: 'guest' });
    if (!user) {
      console.error('User not found');
      return;
    }

    const game = await Game.findById('66afe3aa74cfccd6c3138dbb');
    if (!game) {
      console.error('Game not found');
      return;
    }

    // Insert the user rating
    game.ratings.push({
      username: user._id,
      gameplay: 30,
      difficulty: 60,
      narrative: 90,
    });

    await game.save();
    console.log('Rating added successfully');
  } catch (error) {
    console.error('Error adding user rating:', error);
  }
}

async function deleteUserRating() {
  try {
    const user = await User.findOne({ username: 'guest' });
    if (!user) {
      console.error('User not found');
      return;
    }

    const game = await Game.findById('66afe3aa74cfccd6c3138dbb');
    if (!game) {
      console.error('Game not found');
      return;
    }

    // Remove the user's rating
    const ratingIndex = game.ratings.findIndex((r) => r.username.toString() === user._id.toString());
    if (ratingIndex !== -1) {
      game.ratings.splice(ratingIndex, 1);
      await game.save();
      console.log('Rating deleted successfully');
    } else {
      console.log('User rating not found');
    }
  } catch (error) {
    console.error('Error deleting user rating:', error);
  }
}

const action = process.argv[2];

if (action === 'insert') {
  insertUserRating();
} else if (action === 'delete') {
  deleteUserRating();
} else {
  console.log('Please provide a valid action: insert or delete');
}
