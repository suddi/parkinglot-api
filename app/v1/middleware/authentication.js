'use strict';

const Model = require('../model');
const Enum = require('../../../enum');

module.exports.validate = function* (next) {
    const isValid = yield Model.Credentials.authenticate(this.headers['parkinglot-api-key']);
    if (!isValid) {
        return this.throw(Enum.Status.UNAUTHORIZED);
    }
    yield next;
};
