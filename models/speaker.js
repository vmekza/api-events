const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Speaker extends Model {}
Speaker.init(
  {
    // Speaker ID: Primary key, auto-incremented integer
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Speaker Name: String, cannot be null
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Speaker Bio: String, can be null
    bio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Event ID: Foreign key reference to 'event' table
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'event',
        key: 'id',
      }
    }
  },
  // Sequelize model configuration
  { sequelize, modelName: 'speaker', tableName: 'speakers', timestamps: false }
);

module.exports = Speaker;
