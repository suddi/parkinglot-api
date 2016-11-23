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
