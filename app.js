'use strict';

const co = require('co');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const logger = require('koa-logger');
const cors = require('kcors');

const Config = require('./config');
const getRoutes = require('./app/v1/routes');
const Middleware = require('./app/v1/middleware');
const Utils = require('./utils');

function bootstrap(apiConfig) {
    const app = new Koa();
    app.use(Middleware.ErrorHandling.handle);
    app.use(logger());
    app.use(compress());
    app.use(cors());
    app.use(bodyParser());
    app.use(Middleware.RateLimiter.include());

    app.use(getRoutes());
    app.listen(apiConfig.PORT);
    console.log('API running on port ' + apiConfig.PORT);
}

if (!module.parent) {
    co(function* () {
        Utils.Db.connect(Config.Db.MYSQL_CONNECTION);
        bootstrap(Config.Api);
    }).catch(function (err) {
        console.log('API failed to start');
        console.log(err.message);
        console.log(err.stack);
    });
}

// For unit testing purposes
module.exports = bootstrap;
