'use strict';

const express = require('express');
const notFoundHandler = require('../src/error-handlers/404.js');
const errorHandler = require('../src/error-handlers/500.js');
const logger = require('../src/middleware/logger.js');
const validator = require('./middleware/validator.js');
const exchangeRouter = require('./routes/exchange.js');

const app = express();
app.use(express.json());

app.use(logger);

app.use(exchangeRouter);

app.use('*', notFoundHandler);
app.use(errorHandler);

function start(port) {
    app.listen(port, () => console.log(`Listening to PORT ${port}`));
}

module.exports = {
    app,
    start
}