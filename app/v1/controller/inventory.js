'use strict';

const Enum = require('../../../enum');
const Model = require('../model');

module.exports.get = function* () {
    this.body = {
        status: Enum.Status.OK,
        data: yield Model.Car.calculateEarning(
            this.params.hoursPassed || 0
        )
    };
};
