const express = require('express');
const bcrypt = require('bcrypt');

const { $200True, $200False, emailRegex } = require('../utils/response');
const { catchError } = require('../utils/wrappers');
const error = require('../utils/error');
const connectionFactory = require('../utils/connect');

const { AUTH } = error;

const router = express.Router();

router.get('/', (req, res) => {
    catchError(res, async () => {
        const { User } = await connectionFactory();
        const users = await User.find({}, { _id: 0, email: 1, name: 1 });
        return $200True(res, users);
    });
});

router.get('/:emailId', (req, res) => {
    catchError(res, async () => {
        const { emailId } = req.params;
        if (!emailId?.trim()) return $200False(res, error.INVALID_PARAMS);

        const email = emailId.trim();
        if (!emailRegex.test(email)) return $200False(res, AUTH.INVALID_EMAIL);

        const { User } = await connectionFactory();

        const isExists = await User.exists({ email });

        return $200True(res, isExists);
    });
});

router.post('/register', (req, res) => {
    catchError(res, async () => {
        const { email: emailId, name: userName, password: plainPwd } = req.body;
        if (!emailId?.trim() || !userName?.trim() || !plainPwd?.trim())
            return $200False(res, error.INVALID_PARAMS);

        const email = emailId.trim();
        const name = userName.trim();
        const plainPass = plainPwd.trim();

        if (!emailRegex.test(email)) return $200False(res, AUTH.INVALID_EMAIL);
        if (name.length < 2) return $200False(res, AUTH.INVALID_NAME);
        if (plainPass.length < 5) return $200False(res, AUTH.WEAK_PASSWORD);

        const { User } = await connectionFactory();

        const isExists = await User.exists({ email });
        if (isExists) return $200False(res, AUTH.USER_EXISTS);

        const password = await bcrypt.hash(plainPass, 10);

        const user = new User({
            email,
            name,
            password,
        });

        await user.save();
        return $200True(res, email);
    });
});

router.post('/login', (req, res) => {
    catchError(res, async () => {
        const { email: emailId, password: plainPwd } = req.body;
        if (!emailId?.trim() || !plainPwd?.trim())
            return $200False(res, error.INVALID_PARAMS);

        const email = emailId.trim();
        const password = plainPwd.trim();

        if (!emailRegex.test(email)) return $200False(res, AUTH.INVALID_EMAIL);
        if (password.length < 5) return $200False(res, AUTH.WEAK_PASSWORD);

        const { User } = await connectionFactory();

        const isExists = await User.exists({ email });
        if (!isExists) return $200False(res, AUTH.USER_NOT_EXISTS);

        const user = await User.findOne({ email });

        const isPwdMatches = await bcrypt.compare(password, user.password);
        if (!isPwdMatches) return $200False(res, AUTH.LOGIN_FAILED);

        return $200True(res, {
            email: user.email,
            name: user.name,
            password: user.password,
        });
    });
});

module.exports = router;
