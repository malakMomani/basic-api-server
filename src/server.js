'use strict';

const express = require('express');
const notFoundHandler = require('../src/error-handlers/404.js');
const errorHandler = require('../src/error-handlers/500.js');
const logger = require('../src/middleware/logger.js');
const validator = require('./middleware/validator.js');
const disneyRouter = require('./routes/disneyCharacter.js');
const makeupRouter = require('./routes/makeup.js');


const app = express();
app.use(express.json());

app.use(logger);

app.use(disneyRouter);
app.use(makeupRouter);


app.use('*', notFoundHandler);
app.use(errorHandler);

function start(port) {
    app.listen(port, () => console.log(`Listening to PORT ${port}`));
}

module.exports = {
    app,
    start
}