'use strict';

const Enum = require('../../../enum');

module.exports.get = function () {
    this.body = {
        status: Enum.Status.OK,
        data: {}
    };
};
