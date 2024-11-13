const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  continent: { type: String, required: true, unique: false },
  capital: { type: String, required: true},
//   alpha3Code: { type: String, required: true, unique: true },
//   flag: { type: String, required: true, unique: true },
//   population: { type: String, required: true },
//   area: { type: String, required: true, unique: true },
//   timezone: { type: String, required: true },
});


module.exports = mongoose.model('Country', countrySchema);
