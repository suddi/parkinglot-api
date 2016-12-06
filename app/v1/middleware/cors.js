'use strict';

module.exports.apply = function* (next) {
    // IE8 does not allow domains to be specified, just the *
    // headers['Access-Control-Allow-Origin'] = this.request.headers.origin;
    this.set('Access-Control-Allow-Origin', '*');
    this.set('Access-Control-Allow-Methods', ['POST', 'GET', 'OPTIONS']);
    this.set('Access-Control-Allow-Credentials', false);
    this.set('Access-Control-Max-Age', '86400'); // 24 hours
    this.set('Access-Control-Allow-Headers', ['Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, parkinglot-api-key']);
    return yield next;
};
