const User = require('../db_models/user');
const connectDB = require('../db_connection');

// Connect to MongoDB
connectDB();

async function insertGuestUser() {
  try {
    const user = new User({
      username: 'guest',
      email: 'random_email@example.com',
      password: 'password',
      name: 'Guest'
    });
    await user.save();
    console.log(`Guest user created succesfully`);
  } catch (error) {
    console.error(error);
  }
}

async function deleteGuestUser() {
  try {
    const result = await User.findOneAndDelete({ username: 'guest' });
    if (result) {
      console.log(`Guest user deleted successfully`);
    } else {
      console.log(`Guest user not found`);
    }
  } catch (error) {
    console.error('Error deleting guest user:', error);
  }
}

const action = process.argv[2];

if (action === 'insert') {
  insertGuestUser();
} else if (action === 'delete') {
  deleteGuestUser();
} else {
  console.log('Please provide a valid action: insert or delete');
}