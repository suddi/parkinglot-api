'use strict';

const Controller = require('../controller');
const Middleware = require('../middleware');

module.exports = function (router) {
    router.get('/parkinglots/:parkingLotId/cars/:hoursPassed',
        Middleware.Authentication.validate,
        Controller.ParkingLot.get
    );

    router.post('/parkinglots/:parkingLotId/cars',
        Middleware.Authentication.validate,
        Controller.ParkingLot.post
    );
};
