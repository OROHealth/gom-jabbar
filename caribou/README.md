# Caribou (incomplete) submission
This is my submission for the caribou challenge, ... they might just send us to live on mars :laughing:
The submission definitely needs one or two more days of work to reach what I would consider a sufficiently functional website. Since this is a demo project, and since I won't  have access to a decent computer in the following days this is what the caribous :deer: will have to work with.

## How to build
### Requirements
This project makes use of docker-compose. This means that you will need docker on your machine.
If you don't already have it installed on your machine install Docker desktop:
* [for Mac](https://docs.docker.com/desktop/mac/install/)
* [for Windows](https://docs.docker.com/desktop/windows/install/)
* [for Linux](https://docs.docker.com/compose/install/) 

On windows you will need to download and install the linux kernel update package, but all the installation steps are clearly described in the links above

If you are able to open Docker desktop without having it complaining it means that you are good to go.
### Setting API keys
Since this project makes use of external APIs, and since leaking API keys is not that fun, you will have to input those API keys in the .env file for both the frontend and the backend.
In the caribou directory of the repository there are two folder, frontend and backend. In both of those you will find an example.env file, you will need to rename those to .env and fill in the correct values for your API keys (if the person reading this is Bruno, I will provide you those keys through email so that you don't have to go through the process of creating them).
### running docker-compose
In order to spin up every container you will simply have to cd into gom-jabbar/caribou and then run the command:

    docker-compose up
This command will take quite  a bit of time to get start and build every container for the first time.

:warning: Make sure that nothing is running on ports: 3000, 8080, 5050 and 5432

### accessing the website
The website can then be accessed at [localhost:3000](http://localhost:3000/)
:warning: the frontend takes quite a bit of time to load due to volumes not being super efficient on windows. If you don't  get any errors it's more than likely that you just need to wait 2min for it to start
### database tools
This build also comes with [adminer](http://localhost:8080/) which allows quick accessing and editing of the database. You can login using "postgres" as the username and password, server: "db", database:"CaribDB". Don't forget to select the system as PostgreSQL.
## Functionality and shortcomings
As mentioned earlier the website itself is not complete. Here is the list of features that where implemented:
* API : 
	 * user authentication, with hashing and salting for password storage. Restricted to Cariboued addresses.
	 * human signaling with trashing level and level of excitement
	 * signaling that the user is ready to antler-exchange
	 * weak API security, was planning on implementing input checking, rate-limiting, encryption
	 * Highly secured grmmuu encryption algorithm for messages.
* Database:
	* PostgreSQL database with the following schema: 
	![Alt text](/img/Shema.png?raw=true "Schema")
	*  support for a chat, postgreSQL is not the best db to do that but time didn't  allow for a better solution
* Frontend:
	* Mobile friendly interface (still needs a little fix for a hover function that doesn't like touch inputs but other than that it's  pretty good) everything fits on the viewport and no scrolling is required. Comfortable to use on a wide range of resolutions
	* Google map  implementation
	* Heatmap showing human activity, fetches human locations from database (needs a page refresh to load changed data)
  ![Alt text](/img/Heatmap.png?raw=true "heatmap")
	* Sign in/up (needs a refresh as well to update)
	* Toggle between map and chat
	*  Chat skeleton (ran out of time :expressionless:)
	*  Markers for important locations
	*  Form with slider to signal human presence and rate their trashing levels
  ![Alt text](/img/SignalHuman.png?raw=true "signal human prompt")


Here are a couple screen shots of what the app looks like on different aspect ratios:




In short, I don't like submitting incomplete work but really really want to have at least a couple days of winter break :wink:
I think that with just a bit more time I could have implemented the chat feature(using the db and sockets) and cleaned up the login code on the frontend side of things(so that no refresh is required and so that components update properly).

The things that I would have worked on once the app was functional to make the experience more polished would have been:
* Animations with framer motion
* Creating an actual theme
* Theme toggle (light/dark)
* Other menu pages
* Map loading optimization (when there are tons of markers only fetch and render the ones in the viewport)
* Database indexing

If I had to redo it I would probably have avoided the map library that I used, it caused me way more trouble than what I would have gone through by using the google api directly/ using something else completely.
Still happy with what I did considering that the bulk of the work was done over 4 days where I also had limited time to work on this.
Also sorry for the coding  war-crimes that might be hidden in there, the last couple commits were done with not much sleep and time pressure.