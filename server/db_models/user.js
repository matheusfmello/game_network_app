const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true },
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true },
  name: {type: String, required: true},
  bio: String,
  games_played: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
  friends: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  created_at: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
})



module.exports = mongoose.model('User', UserSchema);
