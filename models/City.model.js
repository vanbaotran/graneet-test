const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const citySchema = new Schema ({
  codePostal:String,
  codeCommune:String,
  libelleAcheminement:String,
  "codeVoie":String,
  "nomCommune":String
},
{
    timestamps: true
  }
  )

module.exports = model('City', citySchema)