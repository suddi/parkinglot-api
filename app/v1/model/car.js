'use strict';

const _ = require('lodash');
const moment = require('moment');

const Config = require('../../../config');
const Utils = require('../../../utils');

function getValuesForCreateRecord(record) {
    const momentParkingTime = moment.utc(record.parkingTime);
    return [
        record.licensePlate + '-' + momentParkingTime.valueOf(),
        record.brand,
        record.licensePlate,
        record.parkingLotId,
        momentParkingTime.format(Config.Time.INPUT_FORMAT),
        record.pricingId
    ];
}

module.exports.create = function* (record) {
    const query =
        'INSERT INTO cars (id, brand, licensePlate, ' +
        'parkingLotId, parkingTime, pricingId) VALUES (?, ?, ?, ?, ?, ?);';
    const parameterizedValues = getValuesForCreateRecord(record);
    return yield Utils.Db.execute(query, parameterizedValues);
};

module.exports.bulkCreate = function* (records) {
    const parameterizedValues = records.map(getValuesForCreateRecord);
    const subquery = Array(parameterizedValues.length + 1).join(' (?, ?, ?, ?, ?, ?),');
    const query =
        'INSERT INTO cars (id, brand, licensePlate, ' +
        'parkingLotId, parkingTime, pricingId) VALUES' + subquery.replace(/,$/, ';');
    return yield Utils.Db.execute(query, _.flatten(parameterizedValues));
};

module.exports.calculateEarningByParkingLotId = function* (parkingLotId, hoursPassed) {
    if (!parkingLotId) {
        return [];
    }

    const time = moment.utc().add(hoursPassed, 'hours').format(Config.Time.INPUT_FORMAT);
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
    const parameterizedValues = [
        Config.Time.DB_FORMAT,
        time,
        parkingLotId
    ];
    return yield Utils.Db.execute(query, parameterizedValues);
};

module.exports.calculateEarning = function* (hoursPassed) {
    const time = moment.utc().add(hoursPassed, 'hours').format(Config.Time.INPUT_FORMAT);
    const query =
        'SELECT count(*) AS totalAmountOfCars, SUM(t.value) / 100 AS `value`, SUM(t.discountInCents) AS discountInCents FROM (' +
            'SELECT ' +
                '@hoursPassed := FLOOR((UNIX_TIMESTAMP(?) - UNIX_TIMESTAMP(parkingTime)) / 3600) AS h, ' +
                '@discountedHours := IF(@hoursPassed > pricing.discountAppliedAfter, @hoursPassed - pricing.discountAppliedAfter, 0) AS discountedHours, ' +
                '@discount := pricing.discountPricingInCents * @discountedHours AS discountInCents, ' +
                '((pricing.standardPricingInCents * @hoursPassed) - @discount) AS `value` ' +
            'FROM cars ' +
            'INNER JOIN pricing ON cars.pricingId = pricing.id) AS t;';
    const parameterizedValues = [
        time
    ];
    return yield Utils.Db.execute(query, parameterizedValues);
};

module.exports.getValuesForCreateRecord = getValuesForCreateRecord;
