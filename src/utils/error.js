module.exports = {
    // Common
    BAD: 'BAD', // Unexpected error
    INVALID_PARAMS: 'INVALID_PARAMS', // invalid or empty request

    AUTH: {
        // Auth common
        WEAK_PASSWORD: 'WEAK_PASSWORD', // weak password
        INVALID_EMAIL: 'INVALID_EMAIL', // invalid email address while signup and sign in

        // Signup
        INVALID_NAME: 'INVALID_NAME', // invalid name (name must be greater than 2 letters)
        USER_EXISTS: 'USER_EXISTS', // user exists while signup

        // Sign in
        LOGIN_FAILED: 'LOGIN_FAILED', // password not matched
        USER_NOT_EXISTS: 'USER_NOT_EXISTS', // invalid email while signing in
    },

    POST: {
        // Post
        POST_FAILED: 'POST_FAILED',
        INVALID_EMAIL: 'INVALID_EMAIL',
        USER_NOT_EXISTS: 'USER_NOT_EXISTS',
        POST_NOT_FOUND: 'POST_NOT_FOUND',
        DENIED: 'DENIED',
    },
};
