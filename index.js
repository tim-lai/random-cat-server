'use strict';
require('dotenv').config();
const http = require('http');
const express = require('express');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

// keys
const CAT_API_KEY = process.env.CAT_API_KEY;
const COOKIE_SESSION_KEY = process.env.COOKIE_SESSION_KEY;

const app = express();

// To secure the headers
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

// Express settings
const serverPort = 3010;
app.set('port', serverPort);
// app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
  name: 'session',
  keys: COOKIE_SESSION_KEY,
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


// CORS; allow cookie from same dev origin
app.use(cors({credentials: true, origin: function(origin, callback){return callback(null,true)}, optionsSuccessStatus: 200})); // this works too.
// app.all('/*', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Request-Headers', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Authorization');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   if (req.method === 'OPTIONS') {
//     res.writeHead(200);
//     res.end();
//   } else {
//     next();
//   }
// });

// Router
app.use('/api/v1', require('./routes/v1'));

// Start server
const startServer = (p) => {
  const port = p || app.get('port');
  const server = http.createServer(app);
  server.listen(port, () => {
    console.log(`server started on port: ${port}`);
  });
  return server;
};

if (!module.parent) {
  startServer();
}

const destroyServer = (server) => {
  server.close(() => {
    console.log('closing out the server');
    process.exit(0);
  });
};

// catch uncaughtException/unhandledRejection errors
process.on('uncaughtException', function (err) {
  console.error('uncaughtException:', err);
});

process.on('unhandledRejection', function (err) {
  console.error('unhandledPromiseRejection:', err);
});

const serverHandlers = {
  startServer,
  destroyServer,
};

module.exports = serverHandlers;
