'use strict';

const expect = require('chai').expect;

const Config = require('../config');
const Util = require('../utils');

module.exports.getConnectionConfig = function () {
    if (Config.Env.CI) {
        return {
            host: 'localhost',
            user: 'root',
            connectionLimit: 10
        };
    }
    return Config.Db.MYSQL_CONNECTION_FOR_TESTING;
};

module.exports.createDb = function* (dbname) {
    const query = `CREATE DATABASE ${dbname};`;
    const result = yield Util.Db.execute(query);

    expect(result.affectedRows).to.eql(1);
};

module.exports.useDb = function* (dbname) {
    const query = `USE ${dbname};`;
    const result = yield Util.Db.execute(query);

    expect(result.affectedRows).to.eql(0);
};

module.exports.dropDb = function* (dbname) {
    const query = `DROP DATABASE ${dbname};`;
    const result = yield Util.Db.execute(query);

    expect(result.affectedRows).to.eql(0);
};

module.exports.createTable = function* (tablename) {
    const query =
        `CREATE TABLE ${tablename} (` +
            '`id` int(4) NOT NULL, ' +
            'PRIMARY KEY (`id`) ' +
        ') ENGINE=InnoDB DEFAULT CHARSET=utf8;';
    const result = yield Util.Db.execute(query);

    expect(result.affectedRows).to.eql(0);
};

module.exports.dropTable = function* (tablename) {
    const query = `DROP TABLE IF EXISTS ${tablename};`;
    yield Util.Db.execute(query);
};

module.exports.insert = function* (tablename, parameterizedValues) {
    const query = `INSERT INTO ${tablename} (id) VALUES (?);`;
    const result = yield Util.Db.execute(query, parameterizedValues);

    expect(result.affectedRows).to.eql(1);
};

module.exports.select = function* (tablename) {
    const query = `SELECT * FROM ${tablename};`;
    const result = yield Util.Db.execute(query);

    return result;
};

module.exports.selectWhere = function* (tablename, parameterizedValues) {
    const query = `SELECT * FROM ${tablename} WHERE id = ?;`;
    const result = yield Util.Db.execute(query, parameterizedValues);

    return result;
};
