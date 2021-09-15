const express = require("express");
const router = express.Router();
const City = require('../models/City.model');

router.get('/',(req,res,next)=>{
  if (!req.query.seachCity) {
    City.find()
    .then(citiesFromDB=>{
      console.log('LOOKING FOR DATA')
      res.status(200).json(citiesFromDB)
      return;
    })
    .catch(err=>res.status(500).json({message:'something wrong when finding cities'}))
  } else {
    let filter = {};
      filter = { codePostal: { '$regex' : `${req.query.searchCity}`, '$options' : 'i' } } ||  { nomCommune:{ '$regex' : `${req.query.searchCity}`, '$options' : 'i' }};
    City.find(filter)
    .then(citiesFound =>{
      res.status(200).json(citiesFound);
      return;
    })
    .catch(err=>res.status(500).json({message:'something wrong when filtering'}));
  }
})


module.exports = router;