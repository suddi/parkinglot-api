'use strict';

const _ = require('lodash');
const co = require('co');
const fs = require('fs');

const Config = require('./config');
const Utils = require('./utils');
const Model = require('./app/v1/model');

function mapCarToCamelCase(record) {
    return {
        brand: record.brand,
        licensePlate: record.licensePlate || record.licenseplate,
        parkingLotId: record.parkingLotId || record.parkinglotid,
        parkingTime: record.parkingTime || record.parkingtime,
        pricingId: Config.Db.DEFAULT_PRICING.id
    };
}

function* importFixtures(data) {
    const records = _.get(data, 'cars.car', []);
    yield Model.Pricing.create(Config.Db.DEFAULT_PRICING);
    for (const record of records) {
        const camelCaseRecord = mapCarToCamelCase(record);
        yield Model.Car.create(camelCaseRecord);
    }
    console.log('Successfully imported ' + records.length + ' records ');
}

function* readXml(filename) {
    const fullPath = Config.Directory.FIXTURES + '/' + filename;
    const xmlString = fs.readFileSync(fullPath);
    return yield Utils.XmlParser.parseString(xmlString);
}

function* load() {
    const filenames = process.argv.slice(2);
    for (const filename of filenames) {
        const data = yield readXml(filename);
        yield importFixtures(data);
    }
}

if (!module.parent) {
    co(function* () {
        Utils.Db.connect(Config.Db.MYSQL_CONNECTION);
        yield load();
    }).catch(function (err) {
        console.log('Failed to load fixtures');
        console.log(err.message);
        console.log(err.stack);
    });
}

module.exports.load = load;
module.exports.importFixtures = importFixtures;
module.exports.mapCarToCamelCase = mapCarToCamelCase;
