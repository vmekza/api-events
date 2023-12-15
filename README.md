# Event Relations API Project

This project is an API service designed to manage and retrieve information about events, venues, and speakers. It provides a comprehensive set of endpoints for creating, updating, and querying data related to various aspects of event management.

## Author:

- Ekaterina Zavyalova

## Instructions to set up and run:

To set up and run the project, navigate to the project directory and execute the following commands:

- cd [directory of the project]
- npm install
- node server.js

### API Endpoints

The API provides several endpoints to manage and retrieve data about events, venues, and speakers. Below are the details of these endpoints:

### EVENTS

##### 1. Get Events

- GET /events - Retrieves a list of all events.
- GET /events?eventId={event ID} - Retrieves an event by ID.
- GET /events?eventName={event name} - Retrieves an event by name.
- GET /events?eventDate={event date} - Retrieves an event by date.
- GET /events?venueId={venue ID} - Retrieves events by venue ID.
- GET /events?venueName={venue name} - Retrieves events by venue name.

##### 2. Create Event

- POST /events - Creates a new event.

##### 3. Update Event

- PUT /events/{event ID} - Updates an existing event.

#### VENUES

##### 1. Get Venues

- GET /venues - Retrieves a list of all venues.
- GET /venues?venueId={venue ID} - Retrieves a venue by ID.
- GET /venues?venueName={venue name} - Retrieves a venue by name.
- GET /venues?venueLocation={venue location} - Retrieves a venue by location.
- GET /venues?eventId={event ID} - Retrieves venues by event ID.
- GET /venues?eventName={event name} - Retrieves venues by event name.

##### 2. Create Venue

- POST /venues - Creates a new venue.

##### 3. Update Venue

- PUT /venues/{venue ID} - Updates an existing venue.

#### SPEAKERS

##### Get Speakers

- GET /speakers - Retrieves a list of all speakers.
- GET /speakers?speakersId={speakers ID} - Retrieves a speaker by ID.
- GET /speakers?speakerName={speaker name} - Retrieves a speaker by name.
- GET /speakers?speakerBio={speaker bio} - Retrieves a speaker by bio.
- GET /speakers?eventId={event ID} - Retrieves speakers by event ID.
- GET /speakers?eventName={event name} - Retrieves speakers by event name.

##### 2. Create Speaker

- POST /speakers - Creates a new speaker.

##### 3. Update Speaker

- PUT /speakers/{speaker ID} - Updates an existing speaker.

### Testing

For testing the API endpoints, it is recommended to use the Postman tool, which was utilized during the development of this project.
