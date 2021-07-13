const { $200False } = require('../utils/response');
const error = require('../utils/error');

async function catchError(res, cb) {
    try {
        await cb();
    } catch (e) {
        console.log(e);
        return $200False(res, error.BAD);
    }
}

module.exports = {
    catchError,
};
