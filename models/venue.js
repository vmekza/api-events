const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Venue extends Model {}
Venue.init(
  {
    // Venue ID: Primary key, auto-incremented integer
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Venue Name: String, cannot be null
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Venue Location: String, cannot be null
    location: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  // Sequelize model configuration
  { sequelize, modelName: 'venue', tableName: 'venue', timestamps: false }
);

module.exports = Venue;

