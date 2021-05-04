'use strict';

const express = require('express');
const superagent = require('superagent');
const router = express.Router();
 // class
const Character = require('../models/exchange.js');
let characterInstance = new Character('Malak');



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
    let obj;
    const url = `http://api.disneyapi.dev/characters?limit=1`;
    superagent.get(url).then(result =>{
        obj = new Character(result.body.data[0].name);
  }).then(()=>{
    let newItem = characterInstance.create(obj);
    console.log(newItem);
    // if(newItem) {
    //     res.status(201).json({
    //         created : 'Successfull'
    //     });
    // }
    // else {
    //     res.status(204).json({
    //         created : 'Unsuccessful'
    //     })
    // }
  }).catch(error =>{
      console.log('ERROR: ', error.message, error.status);
  });
    // use create Method from the class
    
    
}

function updateitem(req, res) {
    let id = parseInt(req.params.id);
    const obj = req.body;
    let updatedRate = characterInstance.update(id, obj);
    if(updatedRate) {
        res.status(200).json({
            created : 'Successfull'
        });
    }
    else {
        res.status(204).json({
            created : 'Unsuccessful'
        })
    }
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