## Install

    cargo build

## Run the app

    cd server && cargo run

## Run the tests

    cargo test

# REST API

The REST API to the app is described below.

# Outremona Service

On Port 8000

## Take Cheese

### Request

`POST /take-cheese/`

    curl -X POST -i -H 'Accept: application/json' http://localhost:8000/take-cheese

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## Squeeze Cheese

### Request

`POSt /squeeze-cheese/`

    curl -X POST -i -H 'Accept: application/json' http://localhost:8000/squeeze-cheese

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36
    
    []

# Montroyashi Service

On Port 8010

## Display Leonard Cohen Lyrics

### Request

`GET /leonard-cohen-lyrics/`

    curl -i -H 'Accept: application/json' http://localhost:8010/leonard-cohen-lyrics/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## Notify that noise was heard

### Request

`POST /noise-heard/`

    curl -X POST -i -H 'Accept: application/json' http://localhost:8010/noise-heard

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36
    
    []

## Check if drunks are around

### Request

`GET /drunks-around/`

    curl -i -H 'Accept: application/json' http://localhost:8010/drunks-around/

### Response

    HTTP/1.1 200 OK
    content-type: application/json
    content-length: 28
    date: Tue, 03 Nov 2020 05:54:12 GMT
    
    {"drunk_people_around":true}

# Verduny Service

On Port 8020

## cut-potatoes

### Request

`POST /cut-potatoes/`

    curl -X POST -i -H 'Content-Type: application/json' -H 'Accept: application/json' \
    http://localhost:8020/cut-potatoes/ \
    -d '{"potatoes": [{"size": 4, "coated_in_maple_syrup": false, "boiled": false, "fried": false }], "size": 2 }'

### Response

HTTP/1.1 200 OK
content-type: application/json
content-length: 186
date: Tue, 03 Nov 2020 06:18:54 GMT

{"potatoes":[
 {"size":2, "coated_in_maple_syrup":false, "boiled":false, "fried":false, "oil_used":null},{"size":2, "coated_in_maple_syrup":false, "boiled":false, "fried":false, "oil_used":null}
]}

## dip-potatoes-in-maple-syrup

### Request

`POST /cut-potatoes/`

    curl -X POST -i -H 'Content-Type: application/json' -H 'Accept: application/json' \
    http://localhost:8020/dip-potatoes-in-maple-syrup/ \
    -d '{"potatoes": [{"size": 4, "coated_in_maple_syrup": false, "boiled": false, "fried": false }]}'

### Response

    HTTP/1.1 200 OK
    content-type: application/json
    content-length: 99
    date: Tue, 03 Nov 2020 06:21:41 GMT

    {"potatoes":[
     {"size":4, "coated_in_maple_syrup":true, "boiled":false, "fried":false, "oil_used":null}
    ]}

# Nordo Service

On Port 8030

## Start boiling potatoes

### Request

`POST /start-boiling/`

    curl -i -X POST 'http://localhost:8030/start-boiling' -H 'Content-Type: application/json' -d '{"potatoes": [{"size": 9, "coated_in_maple_syrup": false, "boiled": false, "fried": false}], "size": 2 }'



### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## Get boiling status

### Request

`POST /boiling-status/`

    curl -i -X POST 'http://localhost:8030/boiling-status'

### Response

    HTTP/1.1 200 OK
    content-type: application/json
    content-length: 21
    date: Tue, 03 Nov 2020 06:27:10 GMT

    {"status":"Freezing"}

## Get boiled Potatoes

### Request

`POST /get-boiled-potatoes/`

    curl -i -X POST 'http://localhost:8030/get-boiled-potatoes'

### Response

    HTTP/1.1 200 OK
    content-type: application/json
    content-length: 21
    date: Tue, 03 Nov 2020 06:27:10 GMT

    {"potatoes": [
     {"size": 9, "coated_in_maple_syrup": false, "boiled": true, "fried": false,"oil_used":null}
    ]}

# Bizar Service

On Port 8040

## Start boiling potatoes

### Request

`POST /start-frying/`

    curl -i -X POST 'http://localhost:8040/start-frying' -H 'Content-Type: application/json' -d '{"potatoes": [{"size": 9, "coated_in_maple_syrup": false, "boiled": false, "fried": false}], "oil": "Sunflower" }'



### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## Get Fried potatoes

### Request

`POST /get-fries/`

    curl -i -X POST 'http://localhost:8040/get-fries'



### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {potatoes: [{"size": 9, "coated_in_maple_syrup": false, "boiled": false, "fried": true, ", "oil": "Sunflower"} ]}'
