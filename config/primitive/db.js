'use strict';

module.exports = function (env, rootDir) {
    return {
        // TODO: Do not use the root user, create separate user for use in Docker
        MYSQL_CONNECTION: {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'parkinglot',
            port: 8889,
            connectionLimit: 10
        },

        MYSQL_CONNECTION_FOR_TESTING: {
            host: 'localhost',
            user: 'root',
            password: 'root',
            port: 8889,
            connectionLimit: 10
        },

        REDIS_CONNECTION: {
            host: 'localhost',
            port: 6379,
            db: 1,
            reconnectOnError: function (err) {
                const TARGET_ERROR = 'READONLY';
                if (err.message.slice(0, TARGET_ERROR.length) === TARGET_ERROR) {
                    return 2;
                }
            },
            retryStrategy: function (times) {
                return 500;
            }
        },

        DEFAULT_PRICING: {
            id: 1,
            standardPricingInCents: 120,
            discountPricingInCents: 10,
            discountAppliedAfter: 3,
            validFrom: '2016-01-01 00:00:00',
            validUntil: '2016-12-31 23:59:59'
        }
    };
};
