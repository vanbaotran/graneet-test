const express = require("express");
const router = express.Router();
const City = require('../models/City.model');

router.post('/',(req,res,next)=>{
  const {keyword} = req.body;
    let filter = {};
      filter =  { $or:[{ nomCommune:{ '$regex' : `${keyword}`, '$options' : 'i' }},{ codePostal:{ '$regex' : `${keyword}`, '$options' : 'i' }}]} ;
    City.find(filter)
    .then(citiesFound =>{
      res.status(200).json(citiesFound);
      return;
    })
    .catch(err=>res.status(500).json({message:'something wrong when filtering'}));
})


module.exports = router;