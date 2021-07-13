const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = userSchema;