'use strict';

const express = require('express');
const superagent = require('superagent');
const router = express.Router();

const DisneyCharacter = require('../models/disneyCharacter.js');
let characterInstance = new DisneyCharacter();



// add my RESTFUL APIs declarations
router.get('/character', getChar);
router.get('/character/:id', getOneChar);
router.post('/character', createChar);
router.put('/character/:id', updateitem);
router.delete('/character/:id', deleteitem);


function getChar(req, res) {
    console.log(characterInstance);
    let items = characterInstance.get();
    res.status(200).json(items);
   
}

function getOneChar(req, res) {
    let id = parseInt(req.params.id); // from the url its a string
    let oneItem = characterInstance.get(id);
    res.status(200).json(oneItem);
}

function createChar(req, res) {
    let obj = req.body;
    let newItem = characterInstance.create(obj);
    res.status(201).json(newItem);
}

function updateitem(req, res) {
    let id = parseInt(req.params.id);
    const obj = req.body;
    let updatedCharacter = characterInstance.update(id, obj);
    res.status(200).json(updatedCharacter);
}

function deleteitem(req, res) {
    let id = parseInt(req.params.id);
    let deleted = characterInstance.delete(id);
    let msg = deleted ? 'Item is deleted': 'Item was not Found'
    let statusCode = deleted ? 202 : 204;
    res.status(statusCode).json({
        msg: msg,
        deleted: deleted
    });
}


module.exports = router;