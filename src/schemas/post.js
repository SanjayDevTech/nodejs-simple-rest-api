const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    email: String,
    title: String,
    content: String,
    created: {
        type: Number,
        default: Date.now,
    },
    updated: {
        type: Number,
        default: Date.now,
    },
});

module.exports = postSchema;
