'use strict';

const Enum = require('../../../enum');

module.exports.handle = function* (next) {
    try {
        yield next;
    } catch (err) {
        const statusCode = err.code || Enum.Status.INTERNAL_ERROR.code;
        this.status = statusCode;
        this.body = {
            status: {
                code: statusCode,
                message: err.message || Enum.Status.INTERNAL_ERROR
            },
            data: {}
        };
    }
};
