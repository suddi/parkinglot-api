'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const Controller = require('../../../../app/v1/controller');
const Model = require('../../../../app/v1/model');
const Enum = require('../../../../enum');

describe('Testing Controller.Inventory', function () {
    beforeEach(function () {
        this.sandbox = sinon.sandbox.create();
    }.bind(this));

    afterEach(function () {
        this.sandbox.restore();
    }.bind(this));

    it('CASE 1: Flow handled correctly', function* () {
        const input = 42;
        const body = {
            example: input
        };
        this.params = {
            hoursPassed: input
        };

        const mock = this.sandbox.mock(Model.Car);
        mock.expects('calculateEarning').once().withArgs(input).returns(Promise.resolve(body));

        const execute = Controller.Inventory.get.bind(this);
        yield execute();

        expect(this.body.status).to.deep.eql(Enum.Status.OK);
        expect(this.body.data).to.deep.eql(body);
    }.bind(this));

    it('CASE 2: params.hoursPassed is not passed', function* () {
        const input = 42;
        const body = {
            example: input
        };
        this.params = {};

        const mock = this.sandbox.mock(Model.Car);
        mock.expects('calculateEarning').once().withArgs(0).returns(Promise.resolve(body));

        const execute = Controller.Inventory.get.bind(this);
        yield execute();

        expect(this.body.status).to.deep.eql(Enum.Status.OK);
        expect(this.body.data).to.deep.eql(body);
    }.bind(this));
});
