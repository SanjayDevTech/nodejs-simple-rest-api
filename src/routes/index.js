const express = require('express');
const { $200True } = require('../utils/response');

const router = express.Router();

router.get('/', (req, res) => {
    return $200True(res, 'simple rest api');
});

module.exports = router;
