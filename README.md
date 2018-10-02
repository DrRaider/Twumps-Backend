## NodeJS-Seed

NodeJS RESTFUL server seed

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Nodejs & npm
- yarn
- sqlite3

### Installing

Clone this repository and install all node modules

```
yarn install
```

Setup the local database

```
touch data/db/database.db
sqlite3 data/db/database.db < data/db/db_script.sql
```

Edit the configuration file `.env`
If you need to setup a proxy, put its address for the following variables :   
`HTTP_PROXY`   
`HTTPS_PROXY`

### Start the server
```
node index.js
```