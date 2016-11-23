# Outstanding Issues

Due to time limitations, I have not completed all the issues to deliver a complete API, so here are the outstanding issues:

* mysql is not dockerized
  * For developement environments, it is easier to have docker executing all the dependencies. This leads to lock-in on dependency versions and eases the process of setup.
* Authentication is not completed
  * I have simply added a uuid api-key and validate the user with it, this is not secure. It would be better to have a login handling to deliver an api-key or use JSON web tokens.
* Request body validation
  * I have not added request body validation, thus `POST /parkinglots/:parkingLotId/cars` is only documented in [README.md](/README.md) for the fields required.
  * I would typically handle validation using JSON schema or RAML
* Testing is limited
  * I was not able to write comprehensive tests to cover all the necessary cases
* There is no API versioning
  * Even though within the folder structure, I have included it as `v1`, there paths themselves do not have this, this is to fulfil requirements
* Pricing has not been handled so that it is subject to change
  * I have added pricing as a separate table, but it ideally needs to be able to be subject to change as prices vary
* Could not finish [parkinglot-site](https://github.com/suddi/parkinglot-site)
  * This is a React.js based site to show the data from parkinglot-api
* Due to time limitations, the api-key is used directly from the client-side, this should be put through a backend to hide the key from users.
