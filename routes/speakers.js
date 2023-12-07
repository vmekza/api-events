const { Sequelize } = require('sequelize');
const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const Speaker = require('../models/speaker');
const { isInvalidString, buildQueryConditions } = require('../utility');

// GET Endpoint for fetching speakers
router.get('/', async (req, res, next) => {
    try {
      // Building query conditions based on request query parameters
      const conditions = buildQueryConditions(req.query);

      // Finding all speakers that match the query conditions
      const speakers = await Speaker.findAll({
        where: conditions.speakerConditions,
        include: [
          // Including related Event data based on conditions
          { model: Event, where: conditions.eventConditions, required: !!req.query.eventId || !!req.query.eventName },
        ],
      });

      // If no speakers found, return 404 status
      if (speakers.length === 0) {
        return res.status(404).json({ error: true, message: 'No speakers found matching the criteria' });
      }
      // Respond with the found speakers
      res.status(200).json(speakers);
    } catch (error) {
      // Handle any errors
      next(error);
    }
  });

  // POST Endpoint for creating a new speaker
  router.post('/', async (req, res, next) => {
    try {
      // Extracting data from request body
      const { name, bio, event_id } = req.body;

      // Validate name input
      if (isInvalidString(name)) {
        return res.status(400).json({ error: true, message: 'Invalid name format or name is empty' });
      }

      let speaker;

      // Validate event_id if provided
      if (event_id !== undefined) {
        if (typeof event_id !== 'number') {
          return res.status(400).json({ error: true, message: 'Invalid event_id format. It should be a number.' });
        }

        // Check if the provided event_id exists in the database
        const event = await Event.findByPk(event_id);
        if (!event) {
          return res.status(404).json({ error: true, message: 'Event not found' });
        }

        // Create the speaker with the association to the provided event_id
        speaker = await Speaker.create({ name, bio, event_id });
      } else {
        /// Create the speaker without the association
        speaker = await Speaker.create({ name, bio });
      }

      // Respond with the created speaker
      res.status(201).json(speaker);
    } catch (error) {
      // Handle any errors
      next(error);
    }
  });

  // PUT Endpoint for updating an existing speaker
  router.put('/:id', async (req, res, next) => {
    try {
      // Parsing speaker ID from URL parameters
      const speakerId = parseInt(req.params.id);
      const { name, bio, event_id } = req.body;

      // Validate speaker ID
      if (isNaN(speakerId)) {
        return res.status(400).json({ error: true, message: 'Invalid speaker ID' });
      }

      // Find the speaker by ID
      const speaker = await Speaker.findByPk(speakerId);
      if (!speaker) {
        return res.status(404).json({ error: true, message: 'Speaker not found' });
      }

      // Update speaker properties if provided in the request body
      // Validate and update name
      if (name !== undefined) {
        if (isInvalidString(name)){
          return res.status(400).json({ error: true, message: 'Invalid name format or name is empty' });
        }
        speaker.name = name;
      }

      // Update bio if provided
      if (bio !== undefined) {
        if (typeof bio === 'string') {
          speaker.bio = bio;
        } else {
          return res.status(400).json({ error: true, message: 'Invalid bio format' });
        }
      }

      // Validate and update event_id
      if (event_id !== undefined) {
        if (typeof event_id === 'number') {
          // Check if the provided event_id exists in the database
          const event = await Event.findByPk(event_id);
          if (!event) {
            return res.status(404).json({ error: true, message: 'Event not found' });
          }

          // Update the speaker's event_id
          speaker.event_id = event_id;
        } else {
          return res.status(400).json({ error: true, message: 'Invalid event ID format or event ID is empty' });
        }
      }

      // Save the updated event
      await speaker.save();
      // Respond with the updated speaker
      res.json(speaker);
    } catch (error) {
      // Handle any errors
      next(error);
    }
  });

module.exports = router;