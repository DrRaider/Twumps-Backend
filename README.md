## TwumpsAPI

Platform to present dynamic data using D3 charts. We aim to find interesting statistics through Donald Trump twitter account.

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

### Start the server
```
node index.js
```