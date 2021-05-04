'use strict';

const logger = require("../src/middleware/logger");

describe('Logger middleware', () => {
    let consoleSpy;
    let req = {},
        res = {},
        next = jest.fn();

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    it('logs The output', () => {
        logger(req, res, next);
        expect(consoleSpy).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });
});