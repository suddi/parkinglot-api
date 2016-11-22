'use strict';

const Enum = require('../../../enum');
const Model = require('../model');

module.exports.get = function* () {
    const result = yield Model.Car.calculateEarning(this.params.hoursPassed || 0);
    this.body = {
        status: Enum.Status.OK,
        data: result
    };
};
