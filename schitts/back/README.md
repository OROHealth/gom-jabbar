## Environnement
You need:
* MongoDB >= version 4 if you choose to use your own database

## Configuration
### Ports
By default, the ports are
* 3085 for dev/production
* 3091 for tests

You can change them in files:
* ./config.json for the dev/production
* ./configTest.json for the tests

### MongoDB Databases Dev/Production and Test
2 choices:
* You can use the online Mongo Atlas databases, nothing to do
* You can choose your own MongoDB databases, you must configure:
    * the file ./config.json for the dev/production
    * the file ./configTest.json for the tests
    with
    * your mongo_host
	* your mongo_user

	AND the file jest-mongodb-config.js with your version of MongoDB

In the 2 cases, the password will be defined later in an environnement variable

## Start your engines !
* Configure the variable environnement mongo_pass
    * For Windows users:
		
	`env:mongo_pass="<Your_Password>"`
	* For Mac and Linux users:
	
	`export mongo_pass=<Your_Password>`
* Run the transpilation TS -> JS

	`npm run build`
* Start the application

	`npm run start`