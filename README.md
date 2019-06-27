# Ads Manager

Ads manager challenge, api using node.js , mongodb and  Clean Architecture principals. 

## Getting Started


### Prerequisites
Install [Node](https://nodejs.org/es/) 
Install [Mongodb](https://www.mongodb.com/download-center) on your system.
Run a server

```
mongod
```
Connect to a host
```
mongo "mongodb://localhost:27017"
```


### Installing

Clone the projects

```
git clone https://github.com/hassnian/ads_m.git
```

Install the  dependencies

```
npm install
```


## Running the tests

For testing i used Jest,

```
npm test
```

## Endpoints
You can use [Postman](https://www.getpostman.com/) to make the http requests.

Get all the non expired ads
```
GET - /ad  
```
Create an ad.Req body needs a title and description
```
POST - /ad
req = {
"title":"selling something",
"description":"for free"
}
```
Create an user
```
POST - /user
req = {
"name":"Rye"
}
```
Show one ad
```
GET - /ad/:adId  
```
Remove one ad
```
DELETE - /ad/:adId  
```
Expire all ads before a date
```
DELETE - /ad/expire/:date 
date format = yyyy-mm-dd
```
Add an Ad to the favourite list of an User
```
PATCH - /user/favourite/ad
req = {
"userId":"cjxelefji0002bamt7aqde04f",
"adId":"cjxejtxk40001bamtenl1643d"
}
```  

## Built With

* [Node.js](https://nodejs.org/es/) - The backend framework used
* [Jest](https://jestjs.io/) - Testing dependency 
* [MongoDB](https://www.mongodb.com/download-center) - Database



