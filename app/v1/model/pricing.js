'use strict';

const Utils = require('../../../utils');

module.exports.create = function* (data) {
    const query =
        'INSERT IGNORE INTO pricing (id, standardPricingInCents, discountPricingInCents, ' +
        'discountAppliedAfter, validFrom, validUntil) VALUES (?, ?, ?, ?, ?, ?);';
    const parameteriezedValues = [
        data.id,
        data.standardPricingInCents,
        data.discountPricingInCents,
        data.discountAppliedAfter,
        data.validFrom,
        data.validUntil
    ];
    return yield Utils.Db.execute(query, parameteriezedValues);
};
