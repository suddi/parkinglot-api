'use strict';

const _ = require('lodash');
const Enum = require('../../../enum');

function getStatus(err) {
    if (_.isInteger(err.code)) {
        return {
            code: err.code,
            message: err.message
        };
    } else if (err.code === 'ER_DUP_ENTRY') {
        return Enum.Status.FORBIDDEN;
    }
    return Enum.Status.INTERNAL_ERROR;
}

module.exports.handle = function* (next) {
    try {
        yield next;
    } catch (err) {
        console.log('Error caught!');
        console.log(err.message);
        console.log(err.stack);

        const status = getStatus(err);
        this.status = status.code;
        this.body = {
            status: {
                code: status.code,
                message: status.message
            },
            data: {}
        };
    }
};
