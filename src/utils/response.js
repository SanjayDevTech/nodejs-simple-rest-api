function $200(response, status, data, errorMessage = '') {
    return response.status(200).json({
        status,
        value: data,
        errorMessage,
    });
}

function $200True(response, data) {
    return $200(response, true, data);
}

function $200False(response, errorMessage) {
    return $200(response, false, undefined, errorMessage);
}

const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

module.exports = {
    $200,
    $200True,
    $200False,
    emailRegex,
};
