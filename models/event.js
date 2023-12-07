const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Event extends Model {}
Event.init(
  {
    // Event ID: Primary key, auto-incremented integer
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Event Name: String, cannot be null
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Event Date: Only the date part, cannot be null
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    // Venue ID: Foreign key reference to 'venue' table
    venue_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'venue',
        key: 'id',
      }
    }
  },
  // Sequelize model configuration
  { sequelize, modelName: 'event', tableName: 'event', timestamps: false }
);

module.exports = Event;

