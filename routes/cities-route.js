const express = require("express");
const router = express.Router();
const City = require('../models/City.model');

router.get('/',(req,res,next)=>{
  let {keyword} = req.body
    let filter = {};
      filter = { codePostal: { '$regex' : `${keyword}`, '$options' : 'i' } } ||  { nomCommune:{ '$regex' : `${keyword}`, '$options' : 'i' }};
    City.find(filter)
    .then(citiesFound =>{
      console.log(citiesFound)
      res.status(200).json(citiesFound);
      return;
    })
    .catch(err=>res.status(500).json({message:'something wrong when filtering'}));
})


module.exports = router;