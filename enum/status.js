'use strict';

function getStatusEnums() {
    return {
        'OK': {
            code: 200,
            message: 'OK'
        },

        'UNAUTHORIZED': {
            code: 401,
            message: 'Invalid URL or API Key'
        },

        'TOO_MANY_REQUESTS': {
            code: 429,
            message: 'Too Many Requests'
        },

        'INTERNAL_ERROR': {
            code: 500,
            message: 'Internal Error'
        }
    };
}

module.exports = getStatusEnums();
