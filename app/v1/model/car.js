'use strict';

const moment = require('moment');

const Config = require('../../../config');
const Utils = require('../../../utils');

module.exports.create = function* (data) {
    const momentParkingTime = moment.utc(data.parkingTime);

    const query =
        'INSERT INTO cars (id, brand, licensePlate, ' +
        'parkingLotId, parkingTime, pricingId) VALUES (?, ?, ?, ?, ?, ?);';
    const parameteriezedValues = [
        data.licensePlate + '-' + momentParkingTime.valueOf(),
        data.brand,
        data.licensePlate,
        data.parkingLotId,
        momentParkingTime.format(Config.Time.INPUT_FORMAT),
        data.pricingId
    ];
    return yield Utils.Db.execute(query, parameteriezedValues);
};

module.exports.calculateEarningByParkingLotId = function* (parkingLotId, hours) {
    if (!parkingLotId) {
        return [];
    }

    const time = moment.utc().format(Config.Time.INPUT_FORMAT);
    const query =
        'SELECT t.brand, t.licensePlate, t.formattedParkingTime AS parkingTime, t.value, t.discountInCents FROM (' +
            'SELECT brand, licensePlate, ' +
                'DATE_FORMAT(parkingTime, "?") AS formattedParkingTime, ' +
                '@hoursPassed := FLOOR((UNIX_TIMESTAMP(?) - UNIX_TIMESTAMP(parkingTime)) / 3600) AS hoursPassed, ' +
                '@discountedHours := IF(@hoursPassed > pricing.discountAppliedAfter, @hoursPassed - pricing.discountAppliedAfter, 0) AS discountedHours, ' +
                '@discount := pricing.discountPricingInCents * @discountedHours AS discountInCents, ' +
                '((pricing.standardPricingInCents * @hoursPassed) - @discount) / 100 AS `value` ' +
            'FROM cars ' +
            'INNER JOIN pricing ON cars.pricingId = pricing.id ' +
            'WHERE cars.parkingLotId = ?) AS t;';
    const parameteriezedValues = [
        Config.Time.DB_FORMAT,
        time,
        parkingLotId
    ];
    return yield Utils.Db.execute(query, parameteriezedValues);
};

module.exports.calculateEarning = function* (hours) {
    const time = moment.utc().format(Config.Time.INPUT_FORMAT);
    const query =
        'SELECT count(*) AS totalAmountOfCars, SUM(t.value) / 100 AS `value`, SUM(t.discountInCents) AS discountInCents FROM (' +
            'SELECT ' +
                '@hoursPassed := FLOOR((UNIX_TIMESTAMP(?) - UNIX_TIMESTAMP(parkingTime)) / 3600) AS h, ' +
                '@discountedHours := IF(@hoursPassed > pricing.discountAppliedAfter, @hoursPassed - pricing.discountAppliedAfter, 0) AS discountedHours, ' +
                '@discount := pricing.discountPricingInCents * @discountedHours AS discountInCents, ' +
                '((pricing.standardPricingInCents * @hoursPassed) - @discount) AS `value` ' +
            'FROM cars ' +
            'INNER JOIN pricing ON cars.pricingId = pricing.id) AS t;';
    const parameteriezedValues = [
        time
    ];
    return yield Utils.Db.execute(query, parameteriezedValues);
};
