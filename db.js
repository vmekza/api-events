const { Sequelize } = require('sequelize');

// Create a new Sequelize instance to connect to a SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'events.db',
  logging: console.log,
});

module.exports = sequelize;
