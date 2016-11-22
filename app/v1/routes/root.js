'use strict';

const Controller = require('../controller');

module.exports = function (router) {
    router.get('/',
        Controller.Whoami.get
    );

    router.get('/whoami',
        Controller.Whoami.get
    );
};
