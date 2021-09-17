const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    age: Number
})

const User = mongoose.model('users', userSchema);

module.exports = User;