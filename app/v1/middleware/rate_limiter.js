'use strict';

const ratelimit = require('koa-ratelimit');
const Redis = require('ioredis');

const Config = require('../../../config');
const Enum = require('../../../enum');

module.exports.include = function () {
    return ratelimit({
        db: new Redis(Config.Db.REDIS_CONNECTION),
        duration: Config.RateLimit.DURATION,
        max: Config.RateLimit.MAX_REQUESTS,
        id: function (ctx) {
            if (ctx.headers['parkinglot-api-key']) {
                return ctx.headers['parkinglot-api-key'];
            }
            return ctx.ip;
        },
        headers: {
            remaining: 'X-RateLimit-Remaining',
            reset: 'X-RateLimit-Reset',
            total: 'X-RateLimit-Limit'
        },
        errorMessage: {
            status: Enum.Status.TOO_MANY_REQUESTS,
            data: {}
        }
    });
};
