const express = require('express');
const mongoose = require('mongoose');

const { $200True, $200False, emailRegex } = require('../utils/response');
const { catchError } = require('../utils/wrappers');
const error = require('../utils/error');
const connectionFactory = require('../utils/connect');

const { POST } = error;
const router = express.Router();

router.get('/', (req, res) => {
    catchError(res, async () => {
        const { email } = req.query;
        const { Post } = await connectionFactory();
        const posts = await Post.find(email ? { email } : {}, {
            _id: 1,
            email: 1,
            title: 1,
            content: 1,
            created: 1,
            updated: 1,
        });
        return $200True(res, {
            posts,
            by: email,
        });
    });
});

router.get('/:postId', (req, res) => {
    catchError(res, async () => {
        const { postId } = req.params;
        const { Post } = await connectionFactory();
        const isPostExists = await Post.exists({
            _id: new mongoose.Types.ObjectId(postId),
        });
        if (!isPostExists) return $200False(res, POST.POST_NOT_FOUND);

        const post = await Post.findOne(
            { _id: new mongoose.Types.ObjectId(postId) },
            { _id: 1, email: 1, title: 1, content: 1, created: 1, updated: 1 },
        );
        return $200True(res, {
            post,
        });
    });
});

router.delete('/:postId', (req, res) => {
    catchError(res, async () => {
        const { email: emailId, password } = req.body;
        const { postId } = req.params;
        if (!postId?.trim() || !emailId?.trim() || !password)
            return $200False(res, error.INVALID_PARAMS);
        const email = emailId.trim();

        if (!emailRegex.test(email)) return $200False(res, POST.INVALID_EMAIL);

        const { User, Post } = await connectionFactory();

        const isPostExists = await Post.exists({
            _id: new mongoose.Types.ObjectId(postId),
        });
        if (!isPostExists) return $200False(res, POST.POST_NOT_FOUND);

        const isExists = await User.exists({ email });
        if (!isExists) return $200False(res, POST.USER_NOT_EXISTS);

        const user = await User.findOne({ email });

        const isPwdMatches = password === user.password;
        if (!isPwdMatches) return $200False(res, POST.POST_FAILED);
        await Post.findByIdAndDelete(new mongoose.Types.ObjectId(postId));

        return $200True(res, {});
    });
});

router.post('/:postId', (req, res) => {
    catchError(res, async () => {
        const {
            title: postTitle,
            content: postContent,
            email: emailId,
            password,
        } = req.body;
        const { postId } = req.params;
        if (
            !postTitle?.trim() ||
            !postContent?.trim() ||
            !postId?.trim() ||
            !emailId?.trim() ||
            !password
        )
            return $200False(res, error.INVALID_PARAMS);

        const title = postTitle.trim();
        const content = postContent.trim();
        const email = emailId.trim();

        if (!emailRegex.test(email)) return $200False(res, POST.INVALID_EMAIL);

        const { User, Post } = await connectionFactory();

        const isPostExists = await Post.exists({
            _id: new mongoose.Types.ObjectId(postId),
        });
        if (!isPostExists) return $200False(res, POST.POST_NOT_FOUND);

        const isExists = await User.exists({ email });
        if (!isExists) return $200False(res, POST.USER_NOT_EXISTS);

        const user = await User.findOne({ email });

        const isPwdMatches = password === user.password;
        if (!isPwdMatches) return $200False(res, POST.POST_FAILED);

        await Post.findByIdAndUpdate(new mongoose.Types.ObjectId(postId), {
            title,
            content,
            updated: Date.now(),
        });

        return $200True(res, {
            postId,
        });
    });
});

router.put('/', (req, res) => {
    catchError(res, async () => {
        const {
            title: postTitle,
            content: postContent,
            email: emailId,
            password,
        } = req.body;
        if (
            !postTitle?.trim() ||
            !postContent?.trim() ||
            !emailId?.trim() ||
            !password
        )
            return $200False(res, error.INVALID_PARAMS);

        const title = postTitle.trim();
        const content = postContent.trim();
        const email = emailId.trim();

        if (!emailRegex.test(email)) return $200False(res, POST.INVALID_EMAIL);

        const { User, Post } = await connectionFactory();

        const isExists = await User.exists({ email });
        if (!isExists) return $200False(res, POST.USER_NOT_EXISTS);

        const user = await User.findOne({ email });

        const isPwdMatches = password === user.password;
        if (!isPwdMatches) return $200False(res, POST.POST_FAILED);

        const post = new Post({
            title,
            content,
            email,
        });

        await post.save();

        return $200True(res, {
            postId: post._id,
        });
    });
});

module.exports = router;
