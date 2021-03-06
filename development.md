# Katana development guide
Katana serves as the presentation layer for sba.gov. It is a Reactjs/Node.js application.  In production, Katana retrieves data from a number of sources,
including the Size Standards API, the Content API, and more. However, you do not need Daisho running in development for Katana to run, instead pulling staticly from those data sources.

## Environment Setup
1. Install [NVM](https://github.com/creationix/nvm)
      * NVM is our node version manager of choice. Please follow the steps detailed on their repo.
2. Download and use the Node version specified in the [.nvmrc](https://github.com/USSBA/sba-gov-katana/blob/master/.nvmrc#L1)
   * Normally you would provide a version number to these commands, but in this project, the appropriate version is supplied to them by the .nvmrc
    ```sh
    nvm install && nvm use
    ```
   
3. Install ESLint: `npm install -g eslint`
4. [OPTIONAL] Setup a git precommit client hook `cp scripts/check-commit-message.sh .git/hooks/commit-msg && chmod 700 .git/hooks/commit-msg`
5. Setup AWS credentials in ~/.aws according to http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html

## Production Build Process
1. `npm install`
1. `npm test` to execute the tests
1. `npm run build` to run the babel and webpack builds
1. `docker build -t katana .` to build it as a docker image named Katana

## Development Process (without local database)
1. `npm install` to install the dependencies
1. Create a [local-development.yaml](#local-development-yaml) file based upon the sample provided.
      * Place it in `config/`
      * Replace any placeholders with the correct values
      * This sets configuration properties for the application ( database connections / daisho connections / feature flagging ) and is different for each environment. Your [local-development.yaml](#local-development-yaml) will override any properties you need to override (probably the database properties).
1. Set `devMode` in your local-development.yaml to `true`
1. `npm start` to run the server/hot-reloader

## Local Database Process without Docker
1. Download mysql seed data
    - execute `./scripts/db/sql/download-sql.sh`
1. `./scripts/db/run-db.sh` to execute a local mysql

## Development Process with Database and Docker
1. Prereqs
    - Access to Daisho-as-a-Service
    - Install [docker-compose](https://docs.docker.com/compose/install/)
    - AWS credentials configured
1. `cd scripts/db/ && ./download-katana-sql.sh`
1. `npm run build` to package up the data
1. `docker-compose up`
1. Browse to localhost:3000
1. Kill with ctrl-c
1. `docker-compose down` to remove containers
1. `npm run build && docker-compose build katana` to rebuild local image


### Directory Guide
* package.json - dependencies
* src
    * app.js - contains the high-level references to init.js, server.js and controller.js
    * init.js - configuration bootstrapping
    * server.js - express initializations
    * views - pug templates
    * controllers - request handler definitions grouped as controllers
    * models - for constituting objects retrieved from the database.
    * service - service modules
    * util - other utilities and logic
    * client
        * components 
        * stores
        * actions
* public - publically accessible folder for static content
    * assets
        * images - pngs and jpgs
        * videos
        * svgs
    * build
* test
    * controllers
    * util
    * client
        * views
        * stores
        * actions
* scripts
* *[auto-generated]* dist - the babelized server source-code