'use strict';

const server = require('../src/server.js');
const supertest = require('supertest');
const mockServer = supertest(server.app);


describe('Testing Server disney characters API', ()=> {
    it('be able to get all characters in DB ', async ()=>{
        let response = await mockServer.get('/character');
        expect(response.status).toEqual(200);
    });
    it('be able to get one disney character based on id',async ()=>{
        let response = await mockServer.get('/character/1')
        expect(response.status).toEqual(200);
    });
    it('be able to update one disney character based on id',async ()=>{
        let response = await mockServer.put('/character/1').send({
            name: "snow wite so pretty",
            gender: 'female'
        });
        expect(response.status).toEqual(200);
        
    });
    it('be able to POST a new character', async ()=> {
        let response = await mockServer.post('/character').send({
            name: "snow white",
            gender: 'female'
        });
        expect(response.status).toEqual(201);
        
    });
});

describe('Testing Server Makeup API', ()=> {
    it('be able to get all items in DB ', async ()=>{
        let response = await mockServer.get('/item');
        expect(response.status).toEqual(200);
    });
    it('be able to get one Makeup item based on id',async ()=>{
        let response = await mockServer.get('/item/1')
        expect(response.status).toEqual(200);
    });
    it('be able to update one Makeup item based on id',async ()=>{
        let response = await mockServer.put('/item/1').send({
            name: "Eyeliner",
            price: 2.1
        });
        expect(response.status).toEqual(200);
    });
    
    it('be able to POST a new  Makeup item', async ()=> {
        let response = await mockServer.post('/item').send({
            name: "Eyeliner",
            price: 1.6
        });
        expect(response.status).toEqual(201);
        expect(response.body.record.name).toEqual("Eyeliner");
        expect(response.body.record.price).toEqual(1.6);
    });
});

