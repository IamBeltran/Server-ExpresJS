    "use strict";
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NPM-MODULE DEPENDENCIES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
    const express         = require('express');
    const bodyParser      = require('body-parser');
    const cookieParser    = require('cookie-parser');
    const session         = require('express-session');
    const morgan          = require('morgan');
    const compression     = require('compression');
    const methodOverride  = require('method-override');
    const cors            = require('cors');
    const favicon         = require('serve-favicon');
    const createError     = require('http-errors');
    const helmet          = require('helmet');
    const secure          = require('ssl-express-www');
    const expressJwt      = require('express-jwt');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS.                                                         │
//  └───────────────────────────────────────────────────────────────────────────────────┘
    const path          = require('path');
    const PUBLIC_PATH   = path.join(__dirname,'..', 'public_html');
    const FAVICON_PATH  = path.join(PUBLIC_PATH,'assets','img','favicon','favicon.ico');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ INSTANT EXPRESS.                                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
    const app	= express();

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │	REQUIRE MY-MODULES DEPENDENCIES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ LOGGERS. ]───────────────────────────────────────────────────────────────────────
    const { SECRET_TOKEN } = require('./config');

//  ──[ LOGGERS. ]───────────────────────────────────────────────────────────────────────
    const { LOGGER_EXPRESS } = require('./services/service.logger');
    const { LOGGER_DEBUG } = require('./services/service.logger');

//  ──[ MONGODB CONNECTION. ]────────────────────────────────────────────────────────────
    const MONGODB_CONNECT = require('./mongodb/connection/mongodb.connect');

//  ──[ ROUTES. ]────────────────────────────────────────────────────────────────────────
    const routes = require('./routes');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SETTINGS.                                                                         │
//  └───────────────────────────────────────────────────────────────────────────────────┘
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');
    app.set('trust proxy', 1) // trust first proxy

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ MIDDLEWARES.                                                                      │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ MIDDLEWARES HTTP REQUEST LOGGER	]────────────────────────────────────────────────
    const MORGAN_FORMAT = process.env.NODE_ENV !== "production" 
      ? "dev" 
      : "combined";
    app.use(
      morgan(MORGAN_FORMAT, {
        skip: function(req, res) {
          return res.statusCode < 400;
        },
        stream: process.stderr
      })
    );

    app.use(
      morgan(MORGAN_FORMAT, {
        skip: function(req, res) {
          return res.statusCode >= 400;
        },
        stream: process.stdout
      })
    );

//  ──[ MIDDLEWARES PARSE DATE. ]───────────────────────────────────────────────────────
    app.use(cookieParser());
    app.use(compression());	
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));
//  app.use(expressJwt({ secret:SECRET_TOKEN }).unless({ path: ["/login"] }));

//  ──[ MIDDLEWARES STATIC. ]────────────────────────────────────────────────────────────
    app.use(favicon(FAVICON_PATH));

//  ──[ MIDDLEWARES SECURITY. ]──────────────────────────────────────────────────────────
    const EXPIRY_DATE = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
    app.use(methodOverride());
    app.use(helmet());
    app.use(cors());
    app.use(session({
      secret: SECRET_TOKEN,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true }
    }));

//  ENABLE CORS FROM CLIENT-SIDE
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ ROUTES.                                                                           │
//  └───────────────────────────────────────────────────────────────────────────────────┘
    app.get('/login', (req, res) =>{
      res.send('Hello from A!');
    });

//  ──[ STATICS FILES.	]────────────────────────────────────────────────────────────────
    app.use(express.static(PUBLIC_PATH));

//  ──[ SET ROUTES API ENDPOINTS.	]──────────────────────────────────────────────────────

    //  PATH http://host:port/api/users
    app.use('/api/users', routes.api.users);

    //  PATH http://host:port/api/users
    app.use('/api/signin', routes.sign.in);

    //  PATH http://host:port/api/users
    app.use('/api/signout', routes.sign.out);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ ERROR HANDLER.                                                                    │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ CATCH 404.	]────────────────────────────────────────────────────────────────────
//  HANDLE NOT SPECIFIED ROUTES
    app.use(function(req, res, next) {
      next(createError(404));
    });

//  ──[ FORWARD TO ERROR HANDLER.	]──────────────────────────────────────────────────────
    app.use(function(err, req, res, next) {

//  SET LOCALS, ONLY PROVIDING ERROR IN DEVELOPMENT
      res.locals.message = err.message;
      res.locals.title = `Error en pagina | code error: ${err.status}`;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      LOGGER_EXPRESS.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
//    RENDER THE ERROR PAGE
      res.status(err.status || 500);
      res.render('error');
  });

//  ──[	EXPORT MODULE ]──────────────────────────────────────────────────────────────────
    module.exports = app;