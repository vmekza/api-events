const Event = require('./event');
const Venue = require('./venue');
const Speaker = require('./speaker');

// Defining Relationships
Event.belongsTo(Venue, { foreignKey: 'venue_id' });
Venue.hasMany(Event, { foreignKey: 'venue_id' });
Event.hasMany(Speaker, { foreignKey: 'event_id' });
Speaker.belongsTo(Event, { foreignKey: 'event_id' });

// Exporting the models
module.exports = {
  Event,
  Venue,
  Speaker,
};
