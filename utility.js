const { Sequelize } = require('sequelize');

// Checks if a given value is an invalid string
// An invalid string is either not a string type or is an empty string after trimming
  function isInvalidString(value) {
    return typeof value !== 'string' || value.trim() === '';
  }

  //Validates a date string against the format 'yyyy-mm-dd'
  function validateDate(date) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    return datePattern.test(date);
  }

  // Builds query conditions for Sequelize based on provided filter parameters
  function buildQueryConditions({ eventId, eventName, eventDate, venueId, venueName, venueLocation, speakerId, speakerName, speakerBio }) {
    let eventConditions = {}, venueConditions = {}, speakerConditions = {};

    // Build conditions for event filters
    if(eventId) {
        eventConditions.id = parseInt(eventId);
    }

    if (eventName) {
      eventConditions.name = { [Sequelize.Op.like]: `%${eventName}%` };
    }

    if (eventDate) {
      if (!validateDate(eventDate)) {
        throw new Error('Invalid date format. Date should be in yyyy-mm-dd format.');
      }
      eventConditions.date = eventDate;
    }

    // Build conditions for venue filters
    if(venueId) {
        venueConditions.id = parseInt(venueId);
    }
    if (venueName) {
      venueConditions.name = { [Sequelize.Op.like]: `%${venueName}%` };
    }
    if (venueLocation) {
        venueConditions.location = { [Sequelize.Op.like]: `%${venueLocation}%` };
    }

    // Build conditions for speaker filters
    if(speakerId) {
        speakerConditions.id = parseInt(speakerId);
    }
    if (speakerName) {
      speakerConditions.name = { [Sequelize.Op.like]: `%${speakerName}%` };
    }
    if (speakerBio) {
        speakerConditions.bio = { [Sequelize.Op.like]: `%${speakerBio}%` };
    }

    // Return the built conditions
    return { eventConditions, venueConditions, speakerConditions };
  }

  module.exports = { isInvalidString, validateDate, buildQueryConditions };