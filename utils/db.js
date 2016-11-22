'use strict';

const mysql = require('promise-mysql');

module.exports.connect = function (dbConfig) {
    exports.pool = mysql.createPool(dbConfig);
    return exports.pool;
};

module.exports.disconnect = function () {
    if (exports.pool.end) {
        exports.pool.end();
    }
};

module.exports.execute = function* (query, parameterizedValues) {
    const connection = yield exports.pool.getConnection();
    let result;
    let error;
    try {
        result = yield connection.query(query, parameterizedValues);
    } catch (err) {
        error = err;
    } finally {
        exports.pool.releaseConnection(connection);
    }

    if (error) {
        throw error;
    }

    if (result) {
        return result;
    }
};
