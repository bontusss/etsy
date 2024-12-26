const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Country = require('../models/country');
const Score = require('../models/score');

const router = express.Router();

//country
router.post('/country', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { name, capital, continent, population, demonym, currency, language, numericCode, timeZone, flag } = req.body;

  // Validate required fields
  if (!name || !capital || !continent || !population || !demonym || !currency || !language || !numericCode || !timeZone || !flag) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Convert the relevant fields to uppercase
    const nameUpper = name.toUpperCase();
    const capitalUpper = capital.toUpperCase();
    const continentUpper = continent.toUpperCase();
    const demonymUpper = demonym.toUpperCase();
    const currencyUpper = currency.toUpperCase();
    const numericCodeUpper = numericCode.toUpperCase();


    // Convert language and timeZone arrays to uppercase if they are arrays
    const languageUpper = language.map(lang => lang.toUpperCase());
    const timeZoneUpper = timeZone.map(zone => zone.toUpperCase());

    // Check if the country already exists (case-insensitive) by name
    const existingCountry = await Country.findOne({
      name: { $regex: new RegExp('^' + nameUpper + '$', 'i') },
    });

    if (existingCountry) {
      return res.status(400).json({ message: 'Country already added' });
    }

    // Create a new country document with uppercase fields
    const country = new Country({
      name: nameUpper,
      capital: capitalUpper,
      continent: continentUpper,
      population, // Population is typically a number, so no need to change to uppercase
      demonym: demonymUpper,
      currency: currencyUpper,
      language: languageUpper, // Uppercase the language entries
      numericCode: numericCodeUpper,
      timeZone: timeZoneUpper, // Uppercase the time zone entries
      flag,
    });

    // Save the new country document
    await country.save();

    res.status(201).json({ message: 'Country added successfully', country });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add country', error: error.message });
  }
});


// Get all countries with name, flag, and capital
router.get('/countries', async (req, res) => {
  try {
    // Fetch 'name', 'flag', and 'capital' fields of all countries
    const countries = await Country.find().select('name flag capital -_id');

    if (countries.length === 0) {
      return res.status(404).json({ message: 'No countries found' });
    }

    // Respond with the list of countries including name, flag, and capital
    res.status(200).json(countries);
  } catch (error) {
    console.error('Error retrieving countries:', error);
    res.status(500).json({ message: 'Error retrieving countries', error: error.message });
  }
});

// Get all Asian countries with name, flag, and capital
router.get('/countries/asia', async (req, res) => {
  try {
    // Fetch 'name', 'flag', and 'capital' fields of countries from Asia
    const countries = await Country.find({ continent: 'ASIA' }).select('name flag capital -_id');

    if (countries.length === 0) {
      return res.status(404).json({ message: 'No countries found' });
    }

    // Respond with the list of countries including name, flag, and capital
    res.status(200).json(countries);
  } catch (error) {
    console.error('Error retrieving countries:', error);
    res.status(500).json({ message: 'Error retrieving countries', error: error.message });
  }
});

// Get all Asian countries with name, flag, and capital
router.get('/countries/africa', async (req, res) => {
  try {
    // Fetch 'name', 'flag', and 'capital' fields of countries from Asia
    const countries = await Country.find({ continent: 'AFRICA' }).select('name flag capital -_id');

    if (countries.length === 0) {
      return res.status(404).json({ message: 'No countries found' });
    }

    // Respond with the list of countries including name, flag, and capital
    res.status(200).json(countries);
  } catch (error) {
    console.error('Error retrieving countries:', error);
    res.status(500).json({ message: 'Error retrieving countries', error: error.message });
  }
});


// Get all Asian countries with name, flag, and capital
router.get('/countries/europe', async (req, res) => {
  try {
    // Fetch 'name', 'flag', and 'capital' fields of countries from Asia
    const countries = await Country.find({ continent: 'EUROPE' }).select('name flag capital -_id');

    if (countries.length === 0) {
      return res.status(404).json({ message: 'No countries found' });
    }

    // Respond with the list of countries including name, flag, and capital
    res.status(200).json(countries);
  } catch (error) {
    console.error('Error retrieving countries:', error);
    res.status(500).json({ message: 'Error retrieving countries', error: error.message });
  }
});


// Get all Asian countries with name, flag, and capital
router.get('/countries/northamerica', async (req, res) => {
  try {
    // Fetch 'name', 'flag', and 'capital' fields of countries from Asia
    const countries = await Country.find({ continent: 'NORTH AMERICA' }).select('name flag capital -_id');

    if (countries.length === 0) {
      return res.status(404).json({ message: 'No countries found' });
    }

    // Respond with the list of countries including name, flag, and capital
    res.status(200).json(countries);
  } catch (error) {
    console.error('Error retrieving countries:', error);
    res.status(500).json({ message: 'Error retrieving countries', error: error.message });
  }
});


// Get all Asian countries with name, flag, and capital
router.get('/countries/southamerica', async (req, res) => {
  try {
    // Fetch 'name', 'flag', and 'capital' fields of countries from Asia
    const countries = await Country.find({ continent: 'SOUTH AMERICA' }).select('name flag capital -_id');

    if (countries.length === 0) {
      return res.status(404).json({ message: 'No countries found' });
    }

    // Respond with the list of countries including name, flag, and capital
    res.status(200).json(countries);
  } catch (error) {
    console.error('Error retrieving countries:', error);
    res.status(500).json({ message: 'Error retrieving countries', error: error.message });
  }
});


// Get all Asian countries with name, flag, and capital
router.get('/countries/australia', async (req, res) => {
  try {
    // Fetch 'name', 'flag', and 'capital' fields of countries from Asia
    const countries = await Country.find({ continent: 'OCEANIA' }).select('name flag capital -_id');

    if (countries.length === 0) {
      return res.status(404).json({ message: 'No countries found' });
    }

    // Respond with the list of countries including name, flag, and capital
    res.status(200).json(countries);
  } catch (error) {
    console.error('Error retrieving countries:', error);
    res.status(500).json({ message: 'Error retrieving countries', error: error.message });
  }
});


// Get all Asian countries with name, flag, and capital
router.get('/countries/antarctica', async (req, res) => {
  try {
    // Fetch 'name', 'flag', and 'capital' fields of countries from Asia
    const countries = await Country.find({ continent: 'ANTARCTICA' }).select('name flag capital -_id');

    if (countries.length === 0) {
      return res.status(404).json({ message: 'No countries found' });
    }

    // Respond with the list of countries including name, flag, and capital
    res.status(200).json(countries);
  } catch (error) {
    console.error('Error retrieving countries:', error);
    res.status(500).json({ message: 'Error retrieving countries', error: error.message });
  }
});



// passport.authenticate('jwt', { session: false }),

// Get countries by name
router.get('/country/:name',  async (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).json({ message: 'Country name is required' });
  }

  // Convert input to uppercase
  const countryName = name.toUpperCase();

  console.log(`Searching for country: ${countryName}`);

  try {
    // Ensure that the country names in the database are also stored or queried in uppercase
    const country = await Country.findOne({ name: countryName });

    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    console.log('Country found:', country);
    res.status(200).json(country);
  } catch (error) {
    console.error('Error retrieving country:', error);
    res.status(500).json({ message: 'Error retrieving country', error: error.message });
  }
});


router.get('/quiz-questions', async (req, res) => {
  try {
    const questions = await Country.aggregate([{ $sample: { size: 10 } }])
      .project({ name: 1, capital: 1, _id: 0 }); // Fetch random 10 countries
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch quiz questions' });
  }
});



// Save Score Endpoint
router.post('/save-score', passport.authenticate('local', { session: true }), async (req, res) => {
  const { score, total } = req.body;

  if (typeof score !== 'number' || typeof total !== 'number') {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const newScore = new Score({
      userId: req.user._id,
      score,
      total
    });

    await newScore.save();

    console.log(`User ${req.user.email} scored ${score} out of ${total}`);
    res.json({ message: 'Score saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// Update country details by name
//PATCH
router.patch('/country/:name', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { name } = req.params;
  const { capital, continent } = req.body;

  if (!capital && !continent) {
    return res.status(400).json({ message: 'At least one field (capital or continent) is required to update' });
  }

  // Convert input to uppercase
  const countryName = name.toUpperCase();
  const capitalUpper = capital ? capital.toUpperCase() : null;
  const continentUpper = continent ? continent.toUpperCase() : null;

  try {
    // Find the country by name
    const country = await Country.findOne({ name: countryName });

    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    // Update the fields if provided
    if (capitalUpper) country.capital = capitalUpper;
    if (continentUpper) country.continent = continentUpper;

    // Save the updated country document
    await country.save();

    res.status(200).json({ message: 'Country updated successfully', country });
  } catch (error) {
    console.error('Error updating country:', error);
    res.status(500).json({ message: 'Error updating country', error: error.message });
  }
});


// Delete a country by name
router.delete('/country/:name', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).json({ message: 'Country name is required' });
  }

  // Convert input to uppercase
  const countryName = name.toUpperCase();

  try {
    // Find and delete the country by name
    const country = await Country.findOneAndDelete({ name: countryName });

    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    res.status(200).json({ message: 'Country deleted successfully' });
  } catch (error) {
    console.error('Error deleting country:', error);
    res.status(500).json({ message: 'Error deleting country', error: error.message });
  }
});


module.exports = router;
