'use strict';

module.exports = function (env, rootDir) {
    return {
        INPUT_FORMAT: 'YYYY-MM-DD HH:mm:ss',
        DB_FORMAT: '%Y-%m-%dT%H:%i:%S+00:00',
        OUTPUT_FORMAT: 'YYYY-MM-DDTHH:mm:ss+00:00'
    };
};
