# Team website for Skillingaryds Pistolskytteklubb
## What is this?
This is the main repo for the website of Skillingaryds Pistolskytteklubb ([Current website](https://www.laget.se/SPSK)).

This repo is a mono repo consisting of both the frontend (client) and the backend (server).

__IN PROGRESS! This setup does not yet work!__
## Setup
### Pre-requisites
1. Download & install Docker desktop from [here](https://docs.docker.com/get-docker/).
    * _Docker dekstop needs to be running in the background while developing locally._
2. Download  & install DBeaver from [here](https://dbeaver.io/download/).
    * _This makes it easier for you to connect to and inspect the database._
3. __Optional:__ Download Postman from [here](https://www.postman.com/downloads/).
    * _Postman_ makes it easy to test the server endpoints.

### Project
1. Pull the repo and run the command ```yarn```.
2. Start the dev-server using ```yarn start```.

### Local PostgreSQL database
<!-- 1. Download PostgreSQL from [here](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).
    * When you get to the point where you can choose which items to install, uncheck PgAdmin and StackBuilder (if possible).
    * _Note: Remember the password and port number you choose when installing. This is needed later_ -->
<!-- 2. Download and install DBeaver from [here](https://dbeaver.io/download/).
    * When starting DBeaver, make a new connection to a PostgreSQL database with the port number and password you chose in the step above. -->


Test api: https://www.postman.com/downloads/

<!-- Docker desktop: https://docs.docker.com/get-docker/ -->

Docker DB: docker run --name Postgres -e POSTGRES_PASSWORD=password -p 8000:5432 -d postgres

Add user to DB: 
```sql
CREATE USER developer WITH PASSWORD 'developer' SUPERUSER
```

env files:



## Why a public repo?
It wont be later on, but for now it will be :)
