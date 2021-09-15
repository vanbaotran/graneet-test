require("dotenv").config();
const mongoose = require('mongoose');
const axios = require('axios')
const City = require('../models/City.model');

const DB_NAME = 'graneet-test'
mongoose
  .connect(process.env.MONGODB_URI, 
 {useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
    })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });
let cities;
const getData = () =>{
  axios
  .get('https://www.data.gouv.fr/fr/datasets/r/711e86e1-d6db-400a-a2a5-86564c2b78db')
  .then(response=>{
    let cities = response.data.splice(0,100)
    City.create(cities)
      .then(citiesFromDB=>{
        console.log(`Created ${citiesFromDB.length} cities`)
        mongoose.connection.close()
      })
      .catch(err=>console.log(`An error occurred while creating cities from the DB: ${err}`))
  })
  .catch(err=>console.log(err))
} 
getData();


