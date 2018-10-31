    "use strict";
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODE-MODULE DEPENDENCIES.                                                 │
//  └───────────────────────────────────────────────────────────────────────────────────┘
    require('dotenv').config();

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │	DECLARATION OF CONSTANTS.                                                         │
//  └───────────────────────────────────────────────────────────────────────────────────┘
    const DEFAULT_PROD_APP_PORT     = 3000;
    const DEFAULT_PROD_APP_HOSTNAME = "localhost";
    const DEFAULT_PROD_DB_SERVER    = 'mongodb://';
    const DEFAULT_PROD_DB_HOST      = 'localhost';
    const DEFAULT_PROD_DB_PORT      = 27017;
    const DEFAULT_PROD_DB_NAME      = 'PROYECTO';
    const DEFAULT_PROD_DB_USER      = "";
    const DEFAULT_PROD_DB_PASS      = "";
    const DEFAULT_PROD_SECRET_TOKEN = "MabelPines565";

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │	MODULE OF CONFIGURATION.                                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
//  'production', 'development' or 'test'
    const env = process.env.NODE_ENV;	

    const CONFIG = {

//  ──[ PRODUCTION. ]────────────────────────────────────────────────────────────────────
      production:{
//      | CONFIGURATION OF THE SERVER PORT
        SERVER:{
          PORT: parseInt(process.env.PROD_APP_PORT) || DEFAULT_PROD_APP_PORT,
          HOSTNAME: process.env.PROD_APP_HOSTNAME || DEFAULT_PROD_APP_HOSTNAME
        },
//      | CONFIGURATION OF THE CONNETION MONGO DB | URI MONGODB:
//      | USERNAME:PASSWORD@HOST1:PORT1/DATABASE?OPTIONS
        MONGODB:{
          SERVER: process.env.PROD_DB_SERVER ||  DEFAULT_PROD_DB_SERVER,
          HOST: process.env.PROD_DB_HOST || DEFAULT_PROD_DB_HOST,
          PORT: parseInt(process.env.PROD_DB_PORT) || DEFAULT_PROD_DB_PORT,
          NAME: process.env.PROD_DB_NAME || DEFAULT_PROD_DB_NAME,
          OPTIONS: {
            user: process.env.PROD_DB_USER || DEFAULT_PROD_DB_USER,
            pass: process.env.PROD_DB_PASS || DEFAULT_PROD_DB_PASS,
            useNewUrlParser:	true,
            autoIndex:			true,
            reconnectTries:		Number.MAX_VALUE,
            reconnectInterval:	500,
            poolSize:			10,
            bufferMaxEntries:	0,
            connectTimeoutMS:	10000,
            socketTimeoutMS:	45000,
            family:				4
          }
        },
//      | CONFIGURATION OF THE SECRET KEY API
        SECRET_TOKEN: process.env.PROD_SECRET_TOKEN || DEFAULT_PROD_SECRET_TOKEN
      },
  //  ──[ DEVELOPMENT. ]───────────────────────────────────────────────────────────────────
      development: {
//      | CONFIGURATION OF THE SERVER PORT
        SERVER:{
          PORT: parseInt(process.env.DEV_APP_PORT) || 3000,
          HOSTNAME: process.env.DEV_APP_HOSTNAME || 'localhost'
        },
//      | CONFIGURATION OF THE CONNETION MONGO DB | URI MONGODB:
//      | USERNAME:PASSWORD@HOST1:PORT1/DATABASE?OPTIONS
        MONGODB:{
          SERVER: process.env.DEV_DB_SERVER || 'mongodb://',
          HOST: process.env.DEV_DB_HOST || 'localhost',
          PORT: parseInt(process.env.DEV_DB_PORT) || 27017,
          NAME: process.env.DEV_DB_NAME || 'DEVELOPMENT',
          OPTIONS: {
            user: process.env.DEV_DB_USER || "",
            pass: process.env.DEV_DB_PASS || "",
            useNewUrlParser:	true,
            autoIndex:			true,
            reconnectTries:		Number.MAX_VALUE,
            reconnectInterval:	500,
            poolSize:			10,
            bufferMaxEntries:	0,
            connectTimeoutMS:	10000,
            socketTimeoutMS:	45000,
            family:				4
          }
        },
//      | CONFIGURATION OF THE SECRET KEY API
        SECRET_TOKEN: process.env.DEV_SECRET_TOKEN || "MabelPines565"
      },
//  ──[ TEST. ]──────────────────────────────────────────────────────────────────────────
      test:{
//      | CONFIGURATION OF THE SERVER PORT
        SERVER:{
          PORT: parseInt(process.env.TEST_APP_PORT) || 3000,
          HOSTNAME: process.env.TEST_APP_HOSTNAME || 'localhost'
        },
//      | CONFIGURATION OF THE CONNETION MONGO DB | URI MONGODB:
//      | USERNAME:PASSWORD@HOST1:PORT1/DATABASE?OPTIONS
        MONGODB:{
          SERVER: process.env.TEST_DB_SERVER || 'mongodb://',
          HOST: process.env.TEST_DB_HOST || 'localhost',
          PORT: parseInt(process.env.TEST_DB_PORT) || 27017,
          NAME: process.env.TEST_DB_NAME || 'TEST',
          OPTIONS: {
            user: process.env.TEST_DB_USER || "",
            pass: process.env.TEST_DB_PASS || "",
            useNewUrlParser:	true,
            autoIndex:			true,
            reconnectTries:		Number.MAX_VALUE,
            reconnectInterval:	500,
            poolSize:			10,
            bufferMaxEntries:	0,
            connectTimeoutMS:	10000,
            socketTimeoutMS:	45000,
            family:				4
          }
        },
//      | CONFIGURATION OF THE SECRET KEY API
        SECRET_TOKEN: process.env.TEST_SECRET_TOKEN || "MabelPines565"
      }
    };

//  ──[	EXPORT MODULE ]─────────────────────────────────────────────────────────────────	
    module.exports = CONFIG[env];