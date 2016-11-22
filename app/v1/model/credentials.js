'use strict';

const Utils = require('../../../utils');

module.exports.authenticate = function* (apiKey) {
    if (!apiKey) {
        return false;
    }

    const query = 'SELECT id FROM credentials WHERE id = ?;';
    const parameteriezedValues = [
        apiKey
    ];
    const result = yield Utils.Db.execute(query, parameteriezedValues);
    return result.length === 1;
};
