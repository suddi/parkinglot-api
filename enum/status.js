'use strict';

function getStatusEnums() {
    return {
        OK: {
            code: 200,
            message: 'OK'
        },

        UNAUTHORIZED: {
            code: 401,
            message: 'Invalid URL Or API Key'
        },

        TOO_MANY_REQUESTS: {
            code: 429,
            message: 'Too Many Requests'
        },

        FORBIDDEN: {
            code: 403,
            message: 'The Requested Action Cannot Be Performed'
        },

        INTERNAL_ERROR: {
            code: 500,
            message: 'Internal Error'
        }
    };
}

module.exports = getStatusEnums();
