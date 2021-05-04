'use strict';

require('dotenv').config();
const server = require('./src/server.js');

// start server
server.start(5050);