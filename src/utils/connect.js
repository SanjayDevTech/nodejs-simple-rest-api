const mongoose = require('mongoose');

let conn, User, Post;

module.exports = async function connectionFactory() {
    if (conn) return { conn, User, Post };

    console.log(
        `mongodb+srv://${process.env.URI}/${process.env.DB}?retryWrites=true&w=majority`,
    );

    conn = await mongoose.connect(
        `mongodb+srv://${process.env.URI}/${process.env.DB}?retryWrites=true&w=majority`,
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
