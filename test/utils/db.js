'use strict';

require('co-mocha');
const expect = require('chai').expect;

const Config = require('../../config');
const Util = require('../../utils');

function getConnectionConfig() {
    if (Config.Env.CI) {
        return {
            host: 'localhost',
            user: 'root',
            database: 'parkinglot',
            connectionLimit: 10
        };
    }
    return Config.Db.MYSQL_CONNECTION;
}

function* dropTable(parameterizedValues) {
    const query = 'DROP TABLE IF EXISTS example;';
    yield Util.Db.execute(query, parameterizedValues);
}

function* createTableQuery(parameterizedValues) {
    const query =
        'CREATE TABLE example (' +
            '`id` int(4) NOT NULL, ' +
            'PRIMARY KEY (`id`) ' +
        ') ENGINE=InnoDB DEFAULT CHARSET=utf8;';
    const result = yield Util.Db.execute(query, parameterizedValues);

    expect(result.affectedRows).to.eql(0);
}

function* insertQuery(parameterizedValues) {
    const query = 'INSERT INTO example (id) VALUES (?);';
    const result = yield Util.Db.execute(query, parameterizedValues);

    expect(result.affectedRows).to.eql(1);
}

function* selectQuery(parameterizedValues, expectedValue) {
    const query = 'SELECT * FROM example;';
    const result = yield Util.Db.execute(query, parameterizedValues);

    expect(result.length).to.eql(1);
    expect(result[0].id).to.eql(expectedValue);
}

function* selectWhereQuery(parameterizedValues, expectedValue) {
    const query = 'SELECT * FROM example WHERE id = ?;';
    const result = yield Util.Db.execute(query, parameterizedValues);

    expect(result.length).to.eql(1);
    expect(result[0].id).to.eql(expectedValue);
}

describe('Testing Util.Db', function () {
    describe('Testing Util.Db.connect', function () {
        it('CASE 1: Able to get pool given config', function () {
            const result = Util.Db.connect(getConnectionConfig());

            expect(result).to.not.be.undefined; // eslint-disable-line no-unused-expressions

            Util.Db.disconnect();
        });
    });

    describe('Testing Util.Db.execute', function () {
        it('CASE 1: Able to execute query successfully', function* () {
            // Repeating connection, so that tests are isolated
            Util.Db.connect(getConnectionConfig());
            const input = 42;

            yield dropTable();
            yield createTableQuery();
            yield insertQuery([input]);
            yield selectQuery([], input);
            yield dropTable();

            Util.Db.disconnect();
        });

        it('CASE 2: Protected against SQL injection using parameterizedValues', function* () {
            // Repeating connection, so that tests are isolated
            Util.Db.connect(getConnectionConfig());
            const input1 = 42;
            const input2 = 43;

            yield dropTable();
            yield createTableQuery();
            yield insertQuery([input1]);
            yield insertQuery([input2]);
            yield selectWhereQuery([input1 + ' or 1 = 1'], input1);
            yield dropTable();

            Util.Db.disconnect();
        });

        it('CASE 3: Connection throws error', function* () {
            // Repeating connection, so that tests are isolated
            Util.Db.connect(getConnectionConfig());
            let error;

            try {
                yield insertQuery(42);
            } catch (err) {
                error = err;
            }

            expect(error.message.split(':')[0]).to.be.eql('ER_NO_SUCH_TABLE');

            Util.Db.disconnect();
        });
    });
});
