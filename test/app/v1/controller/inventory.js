'use strict';

require('co-mocha');
const expect = require('chai').expect;
const sinon = require('sinon');

const Controller = require('../../../../app/v1/controller');
const Model = require('../../../../app/v1/model');
const Enum = require('../../../../enum');

describe('Unit Tests for Controller.Inventory', function () {
    let sandbox;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('CASE 1: Flow handled correctly', function* () {
        const input = 42;
        const body = {
            example: input
        };
        this.params = {
            hoursPassed: input
        };

        const mock = sandbox.mock(Model.Car);
        mock.expects('calculateEarning').once().withArgs(input).returns(Promise.resolve(body));

        const execute = Controller.Inventory.get.bind(this);
        yield execute();

        expect(this.body.status).to.deep.eql(Enum.Status.OK);
        expect(this.body.data).to.deep.eql(body);
    });

    it('CASE 2: params.hoursPassed is not passed', function* () {
        const input = 42;
        const body = {
            example: input
        };
        this.params = {};

        const mock = sandbox.mock(Model.Car);
        mock.expects('calculateEarning').once().withArgs(0).returns(Promise.resolve(body));

        const execute = Controller.Inventory.get.bind(this);
        yield execute();

        expect(this.body.status).to.deep.eql(Enum.Status.OK);
        expect(this.body.data).to.deep.eql(body);
    });
});
