# norbit-homework-server

The backend part of the solution for the Web developer homework for Norbit Hungary.
Both the sample mock application which streams boat positions and the express.js server which is listening to those
positions are implemented here. The first one in [fake-boat-position-streamer](./fake-boat-position-streamer), the
second one in [server](./server).

The client part can be found [here](https://github.com/hawser86/norbit-homework-client).

## Prerequisites

In order to run the application locally install
- [docker](https://www.docker.com/products/docker-desktop/)
- [nvm](https://github.com/nvm-sh/nvm)

## Setup

Execute the following commands

```shell
# set proper node version
nvm use

# install dependencies
npm ci

# start local postgres
npm run docker-up # use "npm run docker-down" when you do not want to use the app anymore 

# run db migration scripts
npm run db-migrate
```

## Run the app

Start the sample mock application which streams boat positions
```shell
npm run start-fake-streamer
```

Open a new terminal window and start the service application (while the mock application is still running)
```shell
npm run dev
```

Start the [client](https://github.com/hawser86/norbit-homework-client).

## Known issues, improvement ideas
- CORS headers are not set properly
- there are some hard coed strings, which should be coming from config / environment variable
  - HTTP port
  - URL of the boat position streamer service
- the [recording.js](./server/recording.js) component has internal state
  - it is lost in case of server restart
  - it will not work properly in case of horizontal scaling
- there is no authentication, SSL
- there is no error handling
- there is no logging
- there are no tests
- the [initialize-websocket.js](./server/initialize-websocket.js) component is too big, it has too many responsibilities,
  it should be refactored and split to smaller components
 