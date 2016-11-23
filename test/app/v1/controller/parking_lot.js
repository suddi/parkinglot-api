'use strict';

require('co-mocha');
const expect = require('chai').expect;
const sinon = require('sinon');

const Controller = require('../../../../app/v1/controller');
const Model = require('../../../../app/v1/model');
const Enum = require('../../../../enum');

describe('Unit Tests for Controller.ParkingLot', function () {
    describe('Testing Controller.ParkingLot.get', function () {
        let sandbox;

        beforeEach(function () {
            sandbox = sinon.sandbox.create();
        });

        afterEach(function () {
            sandbox.restore();
        });

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

            const mock = sandbox.mock(Model.Car);
            mock.expects('calculateEarningByParkingLotId').once().withArgs(input1, input2).returns(Promise.resolve(body));

            const execute = Controller.ParkingLot.get.bind(this);
            yield execute();

            expect(this.body.status).to.deep.eql(Enum.Status.OK);
            expect(this.body.data).to.deep.eql(body);
        });

        it('CASE 2: params.hoursPassed is not passed', function* () {
            const input1 = 1;
            const input2 = 42;
            const body = {
                example: input2
            };
            this.params = {
                parkingLotId: input1
            };

            const mock = sandbox.mock(Model.Car);
            mock.expects('calculateEarningByParkingLotId').once().withArgs(input1, 0).returns(Promise.resolve(body));

            const execute = Controller.ParkingLot.get.bind(this);
            yield execute();

            expect(this.body.status).to.deep.eql(Enum.Status.OK);
            expect(this.body.data).to.deep.eql(body);
        });

        it('CASE 3: params.parkingLotId is not passed', function* () {
            const input2 = 42;
            const body = {
                example: input2
            };
            this.params = {};

            const mock = sandbox.mock(Model.Car);
            mock.expects('calculateEarningByParkingLotId').once().withArgs(undefined, 0).returns(Promise.resolve(body));

            const execute = Controller.ParkingLot.get.bind(this);
            yield execute();

            expect(this.body.status).to.deep.eql(Enum.Status.OK);
            expect(this.body.data).to.deep.eql(body);
        });
    });

    describe('Testing Controller.ParkingLot.post', function () {
        let sandbox;

        beforeEach(function () {
            sandbox = sinon.sandbox.create();
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('CASE 1: Flow handled correctly', function* () {
            const input = 1;
            const body = {
                brand: 'supercar',
                licensePlate: '177-232-DC',
                parkingTime: '2016-11-14T13:00:00+00:00'
            };
            this.params = {
                parkingLotId: input
            };
            this.request = {
                body: body
            };

            body.parkingLotId = input;
            const mock = sandbox.mock(Model.Car);
            mock.expects('create').once().withArgs(body).returns(Promise.resolve(body));

            const execute = Controller.ParkingLot.post.bind(this);
            yield execute();

            expect(this.body.status).to.deep.eql(Enum.Status.OK);
            expect(this.body.data.brand).to.eql(body.brand);
            expect(this.body.data.licensePlate).to.eql(body.licensePlate);
            expect(this.body.data.parkingTime).to.eql(body.parkingTime);
            expect(this.body.data.parkingLotId).to.eql(input);
        });

        it('CASE 2: this.request.body.parkingTime not passed', function* () {
            const input = 1;
            const body = {
                brand: 'supercar',
                licensePlate: '177-232-DC'
            };
            this.params = {
                parkingLotId: input
            };
            this.request = {
                body: body
            };

            body.parkingLotId = input;
            body.parkingTime = undefined;
            const mock = sandbox.mock(Model.Car);
            mock.expects('create').once().withArgs(body).returns(Promise.resolve(body));

            const execute = Controller.ParkingLot.post.bind(this);
            yield execute();

            expect(this.body.status).to.deep.eql(Enum.Status.OK);
            expect(this.body.data.brand).to.eql(body.brand);
            expect(this.body.data.licensePlate).to.eql(body.licensePlate);
            expect(this.body.data.parkingLotId).to.eql(input);
        });
    });
});
