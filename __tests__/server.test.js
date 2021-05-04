'use strict';

const server = require('../src/server.js');

const superTest = require('supertest');
const serverRequest = superTest(server.app);

describe('Testing Server', () => {
    it('handles not found routes', async() => {
        let response = await serverRequest.get('/');
        expect(response.status).toEqual(404);
    });

    it('handles errors', async() => {
        let response = await serverRequest.get('/person');
        expect(response.status).toEqual(500);
    });
    it('handle person with query route', async() => {
        let response = await serverRequest.get('/person?name=malak');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual("{\"name\":\"malak\"}");
    });
});