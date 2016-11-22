'use strict';

const Controller = require('../controller');
const Middleware = require('../middleware');

module.exports = function (router) {
    router.get('/inventory/:hoursPassed',
        Middleware.Authentication.validate,
        Controller.Inventory.get
    );
};
