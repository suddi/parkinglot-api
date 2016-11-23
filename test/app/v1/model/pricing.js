'use strict';

require('co-mocha');
const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');

const Config = require('../../../../config');
const Util = require('../../../../utils');
const DbUtil = require('../../../db_utils');
const Model = require('../../../../app/v1/model');

const DBNAME = 'testexample';

describe.skip('Integration Tests for Model.Pricing', function () {
    describe('Testing Model.Pricing.create', function () {
        before(function* () {
            Util.Db.connect(DbUtil.getConnectionConfig());
            yield DbUtil.createDb(DBNAME);
            yield DbUtil.useDb(DBNAME);
            const query = fs.readFileSync(path.join(__dirname, '/../../../../scripts/schema.sql'), 'utf8');
            yield Util.Db.execute(query);
        });

        after(function* () {
            yield DbUtil.dropDb(DBNAME);
            Util.Db.disconnect();
        });

        it('CASE 1: Can add pricing data', function* () {
            const result = yield Model.Pricing.create(Config.Db.DEFAULT_PRICING);

            expect(result.currency).to.eql('EUR');
        });
    });
});
