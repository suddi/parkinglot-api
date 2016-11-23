'use strict';

require('co-mocha');
const expect = require('chai').expect;

const Config = require('../../../../config');
const Util = require('../../../../utils');
const Model = require('../../../../app/v1/model');

function getConnectionConfig() {
    if (Config.Env.CI) {
        return {
            host: 'localhost',
            user: 'root',
            connectionLimit: 10
        };
    }
    return Config.Db.MYSQL_CONNECTION_FOR_TESTING;
}

function* createDb() {
    const query = 'CREATE DATABASE testexample;';
    const result = yield Util.Db.execute(query);

    expect(result.affectedRows).to.eql(1);
}

function* useDb() {
    const query = 'USE testexample;';
    const result = yield Util.Db.execute(query);

    expect(result.affectedRows).to.eql(0);
}

function* dropDb() {
    const query = 'DROP DATABASE testexample;';
    const result = yield Util.Db.execute(query);

    expect(result.affectedRows).to.eql(0);
}

function* createTable(parameterizedValues) {
    const query =
        'CREATE TABLE credentials (' +
            '`id` int(4) NOT NULL, ' +
            'PRIMARY KEY (`id`) ' +
        ') ENGINE=InnoDB DEFAULT CHARSET=utf8;';
    const result = yield Util.Db.execute(query, parameterizedValues);

    expect(result.affectedRows).to.eql(0);
}

function* dropTable(parameterizedValues) {
    const query = 'DROP TABLE IF EXISTS credentials;';
    yield Util.Db.execute(query, parameterizedValues);
}

function* insertQuery(parameterizedValues) {
    const query = 'INSERT INTO credentials (id) VALUES (?);';
    const result = yield Util.Db.execute(query, parameterizedValues);

    expect(result.affectedRows).to.eql(1);
}

describe('Integration Tests for Model.Credentials', function () {
    describe('Testing Model.Credentials.authenticate', function () {
        before(function* () {
            Util.Db.connect(getConnectionConfig());
            yield createDb();
            yield useDb();
            yield createTable();
        });

        after(function* () {
            yield dropTable();
            yield dropDb();
            Util.Db.disconnect();
        });

        it('CASE 1: apiKey not provided', function* () {
            const result = yield Model.Credentials.authenticate();

            expect(result).to.eql(false);
        });

        it('CASE 2: apiKey does not exist in system', function* () {
            const result = yield Model.Credentials.authenticate('hello');

            expect(result).to.eql(false);
        });

        it('CASE 3: Credentials is validated correctly', function* () {
            const apiKey = 'abc';
            yield insertQuery([apiKey]);

            const result = yield Model.Credentials.authenticate(apiKey);

            expect(result).to.eql(true);
        });
    });
});
