'use strict';

const Router = require('koa-router');
const Require = require('load-directory');

const getRouters = Require.all(__dirname);

module.exports = function () {
    const router = new Router();

    const routerKeys = Object.keys(getRouters);
    routerKeys.map(function (routerKey) {
        return getRouters[routerKey](router);
    });

    return router.routes();
};
