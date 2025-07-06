const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String },
    email: { type: String, unique: true, sparse: true },
    password: { type: String },
    telegramId: { type: String, unique: true, sparse: true },
    city: { type: String },
    subscribed: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);
module.exports = User;