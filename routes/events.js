const { Sequelize } = require('sequelize');
const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const Venue = require('../models/venue');
const Speaker = require('../models/speaker');
const { isInvalidString, validateDate, buildQueryConditions } = require('../utility');

//GET Endpoint for fetching events
router.get('/', async (req, res, next) => {
  try {
    // Building query conditions based on request query parameters
    const conditions = buildQueryConditions(req.query);

    // Finding all events that match the query conditions
    const events = await Event.findAll({
      where: conditions.eventConditions,
      include: [
        // Including related Venue and Speaker data based on conditions
        { model: Venue, where: conditions.venueConditions, required: !!req.query.venueId || !!req.query.venueName },
        { model: Speaker, where: conditions.speakerConditions, required: !!req.query.speakerId },
      ],
    });

    // If no events found, return 404 status
    if (events.length === 0) {
      return res.status(404).json({ error: true, message: 'No events found matching the criteria' });
    }
    // Respond with the found events
    res.status(200).json(events);
  } catch (error) {
    if (error.message === 'Invalid date format. Date should be in yyyy-mm-dd format.') {
      return res.status(400).json({
        error: true,
        message: 'Invalid date format. Date should be in yyyy-mm-dd format.'
      });
    }
    // Handle any errors
    next(error);
  }
});

// POST Endpoint for creating a new event
router.post('/', async (req, res, next) => {
  try {
    // Extracting data from request body
    const { name, date, venue_id } = req.body;

    // Validate input data
    if (isInvalidString(name) || isInvalidString(date)) {
      return res.status(400).json({ error: true, message: 'Invalid input data or some data is missing!' });
    }

    // Validate date format
    if(!validateDate(date)) {
      return res.status(400).json({ error: true, message: 'Invalid date format. Date should be in yyyy-mm-dd format.' });
    }

    // Validate venue_id if provided
    if (venue_id !== undefined) {
      if (typeof venue_id !== 'number') {
        return res.status(400).json({ error: true, message: 'Invalid venue_id format. It should be a number.' });
      }
    // Check if the venue exists
    const venue = await Venue.findByPk(venue_id);
    if (!venue) {
      return res.status(404).json({ error: true, message: 'Venue not found' });
    }
  }
  // Create a new event
    const event = await Event.create({ name, date, venue_id });
    // Respond with the created event
    res.status(201).json(event);
  } catch (error) {
    // Handle any errors
    next(error);
  }
});

// PUT Endpoint for updating an existing event
router.put('/:id', async (req, res, next) => {
    try {
      // Parsing event ID from URL parameters
      const eventId = parseInt(req.params.id);
      const { name, date, venue_id } = req.body;

      // Validate event ID
      if (isNaN(eventId)) {
        return res.status(400).json({ error: true, message: 'Invalid event ID' });
      }

      // Find the event by ID
      const event = await Event.findByPk(eventId);
      if (!event) {
        return res.status(404).json({ error: true, message: 'Event not found' });
      }

      // Update event properties if provided in the request body
      // Validate and update name
      if (name !== undefined) {
        if (isInvalidString(name)){
          return res.status(400).json({ error: true, message: 'Invalid name format or name is empty' });
        }
        event.name = name;
      }

      // Validate and update date
      if (date !== undefined) {
        if (typeof date === 'string' && date.trim() !== '') {
          if (validateDate(date)) {
            event.date = date;
          } else {
            return res.status(400).json({ error: true, message: 'Invalid date format. Date should be in yyyy-mm-dd format.' });
          }
        } else {
          return res.status(400).json({ error: true, message: 'Invalid date format or date is empty' });
        }
      }
      // Validate and update venue_id
      if (venue_id !== undefined) {
        if (typeof venue_id === 'number') {
          const venue = await Venue.findByPk(venue_id);
          if (!venue) {
            return res.status(404).json({ error: true, message: 'Venue not found' });
          }
          event.venue_id = venue_id;
        } else {
          return res.status(400).json({ error: true, message: 'Invalid venue ID format' });
        }
      }
      // Save the updated event
      await event.save();
      // Respond with the updated event
      res.json(event);
    } catch (error) {
      // Handle any errors
      next(error);
    }
  });

module.exports = router;