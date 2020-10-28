# DOCKER ENVIRONMENT SETTINGS
Update ``env.env`` with your docker server address
```
DOCKER_SERVER=
```


# Build and run containers

build and run - ``make - run``

# Manually Building Docker Images

Order Service - ``make - orderservice``
Outremona - ``make - outremona``
Verduny - ``make - verduny``
Nordo - ``make - nordo``
Bizar Gateway - ``make - bizarg``
Bizar - ``make - bizar``
Oldoporto - ``make - oldoporto``
Pierre - ``make - pierre``


# Test poutine making process

Start all services - ``make - run``
make request to  ``:4000/make/order?oil=olive`` - Test poutine making process in olive oil
 - current configuration supports olive and penaut oil
 - you are able add / remove oil types by modifying ``docker-compose.yaml`` file
 - 
View request   ``:4000/view/order?id=`` - View Current progress

# HTTP API

Api for all robot services - tasks are simulated by suspending working threads

## Order Service

### GET
``:4000/`` - Check Status
``:4000/make/order`` - Make order
 - PRAMS 
    - oil

``:4000/view/order`` - View order
- PRAMS 
    - oil

``:4000/view/orders`` - View all orders
### POST
``:4000/progress`` - Update Progress

Request Payload
```
{
    Id         string
	TimeStart  time
	TimeEnd    time
	Done       bool
	Process    int
	Softness   int
	InProgress bool
	Oil        string
}
```


## Outremona
### GET
``:4008/`` - Check Status
### POST
``:4008/outremona`` - Adds request to the cheese queue
    - id
## Verduny
### GET
``:4003/`` - Check Status
### POST
``:4003/verduny`` - Adds request to cutting and dipping queue
- PRAMS 
    - id
## Nordo
### GET
``:4004/`` - Check Status
### POST
``:4004/nordo`` - Adds request to the potato boiling queue
- PRAMS 
    - id

## Bizar Gateway
### GET
``:4005/`` - Check Status
``:4005/check`` - Check if requested oil is available.
- PRAMS 
    - oil
### POST
``:4005/bizar`` - Routes to correct oil fryer service
- PRAMS 
    - id
    - oil
## Bizar
### GET
``:5001/`` - Check Status
### POST
``:5001/bizar`` - Adds request to the frying queue
- PRAMS 
    - id
## Oldoporto
### GET
``:4007/`` - Check Status
### POST
``:4007/oldoporto`` - Adds request to the gravy queue
- PRAMS 
    - id
## Pierre
### GET
``:4009/`` - Check Status
### POST
``:4009/pierre`` - Adds request to the ingredients mixer queue
- PRAMS 
    - id



# gRPC API

ServiceRegistration - registers oil services to oil gateway

```
rpc ServiceRegistration (RegistrationRequest) returns (RegistrationResponse)
```
Request Payload
```
RegistrationRequest{
    string address
    string oiltype
}
```
Response Payload

```
RegistrationRequest{
    bool registered
}
```