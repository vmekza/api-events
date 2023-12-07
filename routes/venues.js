const { Sequelize } = require('sequelize');
const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const Venue = require('../models/venue');
const { isInvalidString, buildQueryConditions } = require('../utility');

// GET Endpoint for fetching venues
router.get('/', async (req, res, next) => {
    try {
      // Build query conditions based on request parameters
    const conditions = buildQueryConditions(req.query);

    // Find all venues that match the conditions, including associated events
    const venues = await Venue.findAll({
      where: conditions.venueConditions,
      include: [
        { model: Event, where: conditions.eventConditions, required: !!req.query.eventId || !!req.query.eventName }
      ],
    });

    // If no venues are found, return a 404 response
    if (venues.length === 0) {
      return res.status(404).json({ error: true, message: 'No venues found matching the criteria' });
    }
      // Send a successful response with the found venues
      res.status(200).json(venues);
    } catch (error) {
      // Handle any errors
      next(error);
    }
  });

  //POST Endpoint to create a new venue
  router.post('/', async (req, res, next) => {
    try {
      // Extract name and location from the request body
      const { name, location } = req.body;

      // Validate input data
      if (isInvalidString(name) || isInvalidString(location)) {
        return res.status(400).json({ error: true, message: 'Invalid input data or some data is missing' });
      }

      // Create a new venue with the provided data
      const venue = await Venue.create({ name, location });
      // Send a successful response with the created venue
      res.status(201).json(venue);
    } catch (error) {
      // Handle any errors
      next(error);
    }
  });

  //PUT Endpoint to update an existing venue
  router.put('/:id', async (req, res, next) => {
    try {
      // Parse the venue ID from the request parameters
      const venueId = parseInt(req.params.id);

      // Extract name and location from the request body
      const { name, location } = req.body;

      // Validate the venue ID
      if (isNaN(venueId)) {
        return res.status(400).json({ error: true, message: 'Invalid venue ID' });
      }

       // Find the venue by its ID
      const venue = await Venue.findByPk(venueId);
      if (!venue) {
        return res.status(404).json({ error: true, message: 'Venue not found' });
      }

      // Update venue properties if provided
      if (name !== undefined) {
        if (isInvalidString(name)){
          return res.status(400).json({ error: true, message: 'Invalid name format or name is empty' });
        }
          venue.name = name;
      }
      if (location !== undefined) {
        if (isInvalidString(location)) {
          return res.status(400).json({ error: true, message: 'Invalid locaton format or location is empty' });
        }
        venue.location = location;

      }

      // Save the updated venue
      await venue.save();
      // Send a successful response with the updated venue
      res.json(venue);
    } catch (error) {
      // Handle any errors
      next(error);
    }
  });

  module.exports = router;