  
'use strict';

module.exports = (req, res, next) => {
    console.log('__LOGGER MIDDLEWARE__ \nPath:', req.path,
        '\nMethod :', req.method,
        '\nQuery :', req.query,
        '\nParams :', req.params);

    req.custom_msg = 'Hello from middleware logger';
    next();
}