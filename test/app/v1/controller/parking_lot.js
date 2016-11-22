'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const Controller = require('../../../../app/v1/controller');
const Model = require('../../../../app/v1/model');
const Enum = require('../../../../enum');

describe('Testing Controller.ParkingLot', function () {
    beforeEach(function () {
        this.sandbox = sinon.sandbox.create();
    }.bind(this));

    afterEach(function () {
        this.sandbox.restore();
    }.bind(this));

    it('CASE 1: Flow handled correctly', function* () {
        const input1 = 1;
        const input2 = 42;
        const body = {
            example: input2
        };
        this.params = {
            parkingLotId: input1,
            hoursPassed: input2
        };

        const mock = this.sandbox.mock(Model.Car);
        mock.expects('calculateEarningByParkingLotId').once().withArgs(input1, input2).returns(Promise.resolve(body));

        const execute = Controller.ParkingLot.get.bind(this);
        yield execute();

        expect(this.body.status).to.deep.eql(Enum.Status.OK);
        expect(this.body.data).to.deep.eql(body);
    }.bind(this));

    it('CASE 2: params.hoursPassed is not passed', function* () {
        const input1 = 1;
        const input2 = 42;
        const body = {
            example: input2
        };
        this.params = {
            parkingLotId: input1
        };

        const mock = this.sandbox.mock(Model.Car);
        mock.expects('calculateEarningByParkingLotId').once().withArgs(input1, 0).returns(Promise.resolve(body));

        const execute = Controller.ParkingLot.get.bind(this);
        yield execute();

        expect(this.body.status).to.deep.eql(Enum.Status.OK);
        expect(this.body.data).to.deep.eql(body);
    }.bind(this));

    it('CASE 3: params.parkingLotId is not passed', function* () {
        const input2 = 42;
        const body = {
            example: input2
        };
        this.params = {};

        const mock = this.sandbox.mock(Model.Car);
        mock.expects('calculateEarningByParkingLotId').once().withArgs(undefined, 0).returns(Promise.resolve(body));

        const execute = Controller.ParkingLot.get.bind(this);
        yield execute();

        expect(this.body.status).to.deep.eql(Enum.Status.OK);
        expect(this.body.data).to.deep.eql(body);
    }.bind(this));
});
