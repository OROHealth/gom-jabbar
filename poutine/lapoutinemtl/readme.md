## La Poutine Montréal

### What is required

* Docker
* Golang
* Node, npm
* newman (npm package)
> check versions below

### How to run?
0. `make setup`
1. `make all`
2. `make compose`
3. `make test`

### Stack
* **`Golang v1.15`**
* **`Echo web framework v4.1`**
* **`Swagger OpenAPI`**
* **`Docker Compose`**
* **`GNU Make`**
* **`Newman`**
* **`Postman`**

### Some Endpoints

##### `/outremona/cheese` 
##### `/verduny/potatoes/cut?size=` 
##### `/verduny/potatoes/dip` 
##### `/bizar/potatoes/fry?oilChoice=` 
##### `/bizar/potatoes/fries` 
##### `/oldoporto/sauce`
##### `/pierre/poutine`

### Summary

1. I have tried to use the builder pattern to create the complex object that is poutine.
2. So, `pierre` can be one such poutine builder, but there can be any number of builders as long as they implement the poutine building process interface.
3. All the services can be easily managed by `make`.
4. To test the services, I am using the npm package `newman` to automate requests to these services.
5. Once the integration tests pass, the containers can be deployed anywhere.
6. Oil choice can either be a query parameter, or a whole new builder like `pierre` with some other kind of oils.
7. `Montroyashi` service is not implemented yet.
8. `Pierre` can only mix cheese, fries and sauce together if they pass the quality check, because once a poutine is made with ingredients that do not pass the check, it is a waste of money, for ex: you mix cold fries and cold sauce and cheese and then check the quality, you cannot undo them.
9. All the services have their `swagger.yaml` in OpenAPI format.

> only tested on a macOS host so far! :( docker networking can trouble on a linux host.
 
