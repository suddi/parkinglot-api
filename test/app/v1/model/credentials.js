'use strict';

require('co-mocha');
const expect = require('chai').expect;

const Util = require('../../../../utils');
const DbUtil = require('../../../db_utils');
const Model = require('../../../../app/v1/model');

const DBNAME = 'testexample';
const TABLENAME = 'credentials';

describe('Integration Tests for Model.Credentials', function () {
    describe('Testing Model.Credentials.authenticate', function () {
        before(function* () {
            Util.Db.connect(DbUtil.getConnectionConfig());
            yield DbUtil.createDb(DBNAME);
            yield DbUtil.useDb(DBNAME);
            yield DbUtil.createTable(TABLENAME);
        });

        after(function* () {
            yield DbUtil.dropTable(TABLENAME);
            yield DbUtil.dropDb(DBNAME);
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
            yield DbUtil.insert(TABLENAME, [apiKey]);

            const result = yield Model.Credentials.authenticate(apiKey);

            expect(result).to.eql(true);
        });
    });
});
