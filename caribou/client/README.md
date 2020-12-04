# caribou-client
"Caribou vs Humans" app will help the planet stay clean from humans. Caribou will be able to track humans and measure their level of littering per location. They can also signal their presence. Once successfully registered and logged in, users will be able to chat and exchange secret information about how to kick humans off the planet.
The app will be using Google map API. It will help display the presence of humans in current or selected locations.
It’s user-friendly, and accessible to every caribou.

## Working Prototype
You can access a working prototype of the node app here:  https://DUMMY-URL.com/ and react app 

## User Stories
This app is for logged-in user.

#### Landing Page
* As a visitor,
* I want to understand what I can do with this app (or sign up, or log in), 
* So I can decide if I want to use it.

#### Login Page
* As a returning register user
* I want to enter my password and username to use this app,
* So I can have access to my account.

#### Sign Up
* As a visitor
* I want to register to use this app
* So I can create a personal Caribou vs Humans account.

#### About Page
* As a logged-in user,
* I want to see guidelines about Caribou vs Humans,
* So that I can start searching and gathering information about humans' presence and littering.

#### Littering Tracker Page
* As a logged-in user,
* I want to be able to find the location of humans who are littering and evaluate the level of damages, 
* So that I can control and monitor humans activity.

#### Live Chat Page
* As a logged-in user,
* I want to be able to chat about humans activity,
* So that I can share information with the other members.

### Graybox Wireframes
Full website graybox wireframes
:-------------------------:
![Full website graybox wireframes](/github-images/wireframes/caribou-client-graybox-wireframes.png) 
## Functionality
The app's functionality includes:
* User can track human damages

## Business Objects (back-end structure)
* Users (database table)
    * id  
    * email (email validation)
    * password (at least one number, one lowercase and one uppercase letter at least eight characters that are letters, numbers or the underscore)

* Posts 
    * id 
    * user_id
    * content 
    * modified

## Components Structure
* __Index.js__ (stateless)
    * __App.js__ (stateful)
        * __LandingPage.js__ (stateful) - gets the _"prop name"_ and the _"callback prop name"_ from the __App.js__
            * __Login.js__ (stateful) - 
            * __Register.js__ (stateful) -            
        * __Navbar.js__ (stateless) - 
        * __About.js__ (stateless)  - 
        * __Tracker.js__ (statelful) - 
            * __Calculator.js__ (statelful) - 
        * __LiveChat.js__ (statelful) - 
            * __ReadChat__ (stateful) - 


## Api Documentation
* The Google map api address is  
* The endpoint url is 

## Technology
* Front-End: HTML5, CSS3, JavaScript ES6, React
* Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, Postgres
* Development Environment: Heroku

## Responsive
App is built to be usable on mobile devices, as well as responsive across mobile, tablet, laptop, and desktop screen resolutions.

## Development Roadmap
This is v1.0 of the app, but future enhancements are expected to include:
* A feature that will allow individual humans and individual caribou to be untrackable
* A feature that will provide encrypted messages

## How to run it
Use command line to navigate into the project folder and run the following in terminal

### Local Node scripts
* To install the node project ===> npm install
* To migrate the database ===> npm run migrate -- 1
* To run Node server (on port 8000) ===> npm run dev
* To run tests ===> npm run test

### Local React scripts
* To install the react project ===> npm install
* To run react (on port 3000) ===> npm start
* To run tests ===> npm run test