'use strict';

module.exports = function (env, rootDir) {
    return {
        NODE_ENV: env,
        CI: process.env.CI || process.env.TRAVIS || false
    };
};
