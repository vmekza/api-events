const { Sequelize } = require('sequelize'); // ORM for database interactions
const express = require('express'); // Framework for building web applications
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const eventsRouter = require('./routes/events'); // Router for event-related routes
const venuesRouter = require('./routes/venues'); // Router for venue-related routes
const speakersRouter = require('./routes/speakers'); // Router for speaker-related routes

const app = express(); // Create an Express application

// Middleware to parse JSON bodies in requests
app.use(bodyParser.json());

// Import the database connection
const sequelize = require('./db');

// Import models (this will register them with Sequelize)
require('./models/index');

// Sync all defined models with database.
sequelize.sync();

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
  // Check if the error is a SyntaxError caused by invalid JSON in the request body
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    // Respond with a 400 Bad Request error and a descriptive message
    return res.status(400).json({
      error: true,
      message: 'Invalid JSON format'
    });
  }
  next();
});

// Register routers for different paths
app.use('/events', eventsRouter);
app.use('/venues', venuesRouter);
app.use('/speakers', speakersRouter);

// Define the port to listen on
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
