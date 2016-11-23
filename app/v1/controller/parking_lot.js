'use strict';

const _ = require('lodash');

const Enum = require('../../../enum');
const Model = require('../model');

module.exports.get = function* () {
    this.body = {
        status: Enum.Status.OK,
        data: yield Model.Car.calculateEarningByParkingLotId(
                this.params.parkingLotId,
                this.params.hoursPassed || 0
        )
    };
};

module.exports.post = function* () {
    this.body = {
        status: Enum.Status.OK,
        data: yield Model.Car.create({
            brand: this.request.body.brand,
            licensePlate: this.request.body.licensePlate,
            parkingLotId: this.params.parkingLotId,
            parkingTime: this.request.body.parkingTime
        })
    };
};
