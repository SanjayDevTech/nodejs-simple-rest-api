const mongoose = require('mongoose');

let conn, User, Post;

module.exports = async function connectionFactory() {
    if (conn) return { conn, User, Post };

    console.log('First time');

    conn = await mongoose.connect(
        `mongodb://database:27017/${process.env.DB}`,
        {
            useUnifiedTopology: true,
        },
    );

    User = conn.model('User', require('../schemas/user'));
    Post = conn.model('Post', require('../schemas/post'));

    User.createCollection();
    Post.createCollection();

    return { conn, User, Post };
};
