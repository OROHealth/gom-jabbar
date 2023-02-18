# Getting Started the App
- Cd into caribou-project and run in the terminal:

cd caribou-project
npm run install:both
npm run start:both

These two commands will install the packages for both the client and the server and also run both applications in the terminal.

# Environment Variables Needed
## Server
### Environment
NODE_ENV=
### Port Backend
SERVER_PORT=
### Client Url
CLIENT_URL=
SERVER_URL=
### Database or DATABASE_URL=
MONGODB_URL=
### Token
JWT_ACCESS_TOKEN=
JWT_REFRESH_TOKEN=
### Session Keys
COOKIE_KEY_ONE=
COOKIE_KEY_TWO=


## Client
REACT_APP_MAPBOX_API_KEY=
REACT_APP_GOOGLE_API_KEY=

## Overview
Since the dawn of time, Caribou have been pretending to be stupid mammals but secretly observing the evolution of those
trashy unruly specimen of biped unoptimality called humans.

Recently though, the Committee to Avoid Humans At All Point (CAHAAP) has discovered that it was becoming very difficult
to continue gather and exchange valuable intel using their encrypted antlers patterns.

To help them, we, the Assembly of Inter-Human-Caribou Harmony  (IHCH), have decided to provide them with the full
service of a modern experience while using their CaribouPhones (an Android variant, obviously)


## Task
### Implementing the API PART
Function to allow the user to:
> Create a pin on the map in a specific location to signal the presence of a human that includes trashing level and level of excitement.
> Signal when a human has exited the zone


### Implementing the Single Page Application PART
> Displays a map of the users current vicinity
> Display the zone where humans are currently actively trashing the world
> Notify/Signals you when a human has quit the zone

## Requirements
- an API that allows :
  - [] to signal the presence of a human in a specific location with trashing level and level of excitement
  - [] to request if the presence of a human was signaled in a specific location
  - [] to signal a Caribou is ready to antler-exchange
  - [✔] is highly secured

- a Single Page Application that
  - [✔] displays a map of the current vicinity and display the zone where human are currently actively trashing the world
  - [] signals when a human has quit the zone
  - [] allows them to signal the presence of human and rate its trashing level
  - [] presents a live-chat to allow Antler-exchange using the highly secure Caribou algorithm: every vowel is replaced by
    'muu' and every consonant is replaced by 'grm'
  - [✔] is secured to only allow signing up with addresses that are Cariboued (they contain 'carib' at the end of the
    username, like bruno-carib@orohealth.me is my Caribou address, yes, I am a secret Caribou agent)
Bonus/Optional
  - [✔] Make sure that an individual human can't be tracked?
  - [] Make sure that an individual Caribou can't be tracked?
  - [] Storing the chat conversation in a reversible encrypted format that only participant in the conversation can decrypt?






## What I would have implemented
> Sign up would have included the first name and last name
> I would add tooltip to show when a user create a pin on the map
