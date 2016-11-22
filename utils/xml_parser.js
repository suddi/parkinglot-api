'use strict';

const _ = require('lodash');
const xml2js = require('xml2js');

function execute(parser, content) {
    return new Promise(function (resolve, reject) {
        parser.parseString(content, function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

function getDefaultXmlOptions() {
    return {
        explicitArray: false,
        mergeAttrs: true
    };
}

module.exports.parseString = function* (content, xmlOptions) {
    const parser = new xml2js.Parser(_.merge(getDefaultXmlOptions(), xmlOptions));
    return yield execute(parser, content);
};

// For unit testing purposes
module.exports.execute = execute;
module.exports.getDefaultXmlOptions = getDefaultXmlOptions;
