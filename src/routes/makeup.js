'use strict';

const express = require('express');
const superagent = require('superagent');
const router = express.Router();

const MakeupItem = require('../models/makeup.js');
let makeupItem = new MakeupItem();



// add my RESTFUL APIs declarations
router.get('/item', getItem);
router.get('/item/:id', getOneItem);
router.post('/item', createItem);
router.put('/item/:id', updateitem);
router.delete('/item/:id', deleteitem);


function getItem(req, res) {
    //console.log(makeupItem);
    let items = makeupItem.get();
    res.status(200).json(items);
   
}

function getOneItem(req, res) {
    let id = parseInt(req.params.id); // from the url its a string
    let oneItem = makeupItem.get(id);
    res.status(200).json(oneItem);
}

function createItem(req, res) {
    let obj = req.body;
    let newItem = makeupItem.create(obj);
    res.status(201).json(newItem);
}

function updateitem(req, res) {
    let id = parseInt(req.params.id);
    const obj = req.body;
    let updatedCharacter = makeupItem.update(id, obj);
    res.status(200).json(updatedCharacter);
}

function deleteitem(req, res) {
    let id = parseInt(req.params.id);
    let deleted = makeupItem.delete(id);
    let msg = deleted ? 'Item is deleted': 'Item was not Found'
    let statusCode = deleted ? 202 : 204;
    res.status(statusCode).json({
        msg: msg,
        deleted: deleted
    });
}


module.exports = router;