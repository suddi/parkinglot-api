'use strict';

require('co-mocha');
const expect = require('chai').expect;

const Util = require('../../utils');
const DbUtil = require('../db_utils');

const DBNAME = 'testexample';
const TABLENAME = 'example';

describe('Integration Tests for Util.Db', function () {
    describe('Testing Util.Db.connect', function () {
        it('CASE 1: Able to get pool given config', function () {
            const result = Util.Db.connect(DbUtil.getConnectionConfig());

            expect(result).to.not.be.undefined; // eslint-disable-line no-unused-expressions

            Util.Db.disconnect();
        });
    });

    describe('Testing Util.Db.execute', function () {
        before(function* () {
            Util.Db.connect(DbUtil.getConnectionConfig());
            yield DbUtil.createDb(DBNAME);
            yield DbUtil.useDb(DBNAME);
        });

        beforeEach(function* () {
            yield DbUtil.createTable(TABLENAME);
        });

        afterEach(function* () {
            yield DbUtil.dropTable(TABLENAME);
        });

        after(function* () {
            yield DbUtil.dropDb(DBNAME);
            Util.Db.disconnect();
        });

        it('CASE 1: Able to execute query successfully', function* () {
            const input = 42;

            yield DbUtil.insert(TABLENAME, [input]);
            const result = yield DbUtil.select(TABLENAME);

            expect(result.length).to.eql(1);
            expect(result[0].id).to.eql(input);
        });

        it('CASE 2: Protected against SQL injection using parameterizedValues', function* () {
            const input1 = 42;
            const input2 = 43;

            yield DbUtil.insert(TABLENAME, [input1]);
            yield DbUtil.insert(TABLENAME, [input2]);
            const result = yield DbUtil.selectWhere(TABLENAME, [`${input1} OR 1 = 1`]);

            expect(result.length).to.eql(1);
            expect(result[0].id).to.eql(input1);
        });

        it('CASE 3: Connection throws error', function* () {
            let error;

            yield DbUtil.dropTable(TABLENAME);
            try {
                yield DbUtil.insert(TABLENAME, [42]);
            } catch (err) {
                error = err;
            }

            expect(error.code).to.be.eql('ER_NO_SUCH_TABLE');
        });
    });
});
