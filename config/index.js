'use strict';

const _ = require('lodash');

const ENV = process.env.NODE_ENV || 'development';

function getProjectRoot() {
    return require.main.filename.replace(/\/[\w_ ]+\.js$/, '');
}

function loadConfig(loadFunction) {
    return loadFunction(ENV, getProjectRoot());
}

function compileConfig(primitives) {
    return _.mapValues(primitives, loadConfig);
}

module.exports = compileConfig(require('./primitive'));
