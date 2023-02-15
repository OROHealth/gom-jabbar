# Caribou Tracking System

## Prerequisites

[Yarn](https://yarnpkg.com)

[Node.js](https://nodejs.org/en/)

## Installation

Navigate to the client directory:

```
cd caribou/client
```

Install the dependencies and start the client:

```
yarn install
yarn start
```

In a new terminal, navigate to the server directory:

```
cd caribou/server
```

Install the dependencies and start the server:

```
yarn install
yarn start
```

## Functionality

The Caribou Tracking System allows users to track caribous and humans in real-time. The following features are available:

Login Page: This page will allow caribous to register for the service or login to their accounts. Note that the e-mail address must contain "carib" for entry into the service.

Dashboard: Once, a caribou signs in, they will see their dashboard. The dashboard will allow the caribous to:
- Add humans to the map and signal their coordinates, excitement level, and thrashing level. Humans move randomly once they are added.
- Add caribous on the map to signal that they are available for antler exchange.
- When a caribou on the map is clicked, a room ID is available. This will allow other caribous to start a live chat to partake in antler exchange.
- Add a radar to the map to identify a zone to monitor. Humans in this zone will be listed. Humans that have left this zone will disappear from the list.