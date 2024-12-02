const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  continent: { type: String, required: true },
  capital: { type: String, required: true },
  population: { type: Number, required: true }, // Population of the country
  demonym: { type: String, required: true },   // Nationality descriptor
  currency: { type: String, required: true },  // Currency name or code
  language: { type: [String], required: true }, // List of official languages
  numericCode: { type: String, required: true }, // ISO 3166-1 numeric code
  timeZone: { type: [String], required: true },  // List of time zones
  flag: { type: String, required: true },        // URL to the flag image
});


module.exports = mongoose.model('Country', countrySchema);
