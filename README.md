# Parking Lot API

[![Build Status](https://travis-ci.org/suddi/parkinglot.svg?branch=master)](https://travis-ci.org/suddi/parkinglot)
[![codecov](https://codecov.io/gh/suddi/parkinglot/branch/master/graph/badge.svg)](https://codecov.io/gh/suddi/parkinglot)
[![license](https://img.shields.io/github/license/suddi/parkinglot.svg)](https://github.com/suddi/parkinglot/LICENSE)

## Setup

To setup on Ubuntu 16.04 Xenial Xerus, setup scripts are provided, to run these:

````sh
. ./setup.sh
````

This will install the following:
* docker
* nvm, node and npm

You will also need to mysql 5.7, to install all these manually, you may follow:
* [docker](https://docs.docker.com/engine/installation/)
* [nvm](https://github.com/creationix/nvm#install-script)
* [mysql](https://dev.mysql.com/doc/refman/5.7/en/installing.html)

If you are not using the default configuration in mysql, you will need to update the DB config [here](/config/primitive/db.js) and testing config [here](/test/db_utils.js).

Please create a database in mysql and load the [SQL schema file](/scripts/schema.sql), this will create the necessary tables.

Once these have been installed, please run:

````sh
# This may be skipped if you used used setup.sh to setup node.js
npm install -g pm2

npm install
````

## Usage

To load fixtures, first add a fixture file to the `fixtures` directory.

There is already a sample fixture file provided [here](/fixtures/cars.xml), to load this into the DB:

````sh
# npm run load-fixtures <filename>

npm run load-fixtures cars.xml
````

To startup `redis`, which is used for rate-limiting:

````sh
# To bring up redis
npm run docker-up

# To take down redis
npm run docker-down
````

To start up the API:

````sh
npm start
````

You may also startup the API using PM2:

````sh
pm2 start scripts/startup/development.json
# or
pm2 start scripts/startup/production.json
````

This will by default, start up the API on port 3000.

There are several endpoints provided:
* `GET /` and `GET /whoami`
  * Health check endpoints
* `GET /parkinglots/:parkingLotId/cars/:hoursPassed`
  * This will calculate the earning made on parked cars given a valid parking lot and number of hours in the future
* `GET /inventory/:hoursPassed`
  * This will return the number of cars in all the parking lots and the earning made given the number of hours in the future
* `POST /parkinglots/:parkingLotId/cars`
  * This will add a car to the parking lot
  * You only need to provide the following: `brand`, `licencePlate` and `parkingTime` (will take current UTC time if not provided)

To run the linter, tests and generate code coverage:

````sh
# To execute the linter separately
npm run lint

# To execute linter, tests and generate code coverage
npm test
````

## Outstanding Issues

There are a number of outstanding issues, that due to time limitation have not been included, to view these, please visit [OUTSTANDING_ISSUES.md](/OUTSTANDING_ISSUES.md).
