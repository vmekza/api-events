# Event Relations API Project

## Author:

- Ekaterina Zavyalova

## Date: 28.11.2023

## Instructions to set up and run:

To set up and run the project, navigate to the project directory and execute the following commands:

- cd [directory of the project]
- npm install
- node server.js

### API Endpoints to Test in Postman Tool

To effectively test and interact with the API, the Postman tool is recommended as it was used in project development.

### EVENTS

##### 1. Get Events

- **Method**: GET
- **URL**: `http://localhost:3000/events`
- **Description**: Retrieves a list of all events.

- **Method**: GET
- **URL**: `http://localhost:3000/events?eventId={event ID}`
- **Description**: Retrieves an event with the specified ID.

- **Method**: GET
- **URL**: `http://localhost:3000/events?eventName={event name}`
- **Description**: Retrieves an event with the specified name.

- **Method**: GET
- **URL**: `http://localhost:3000/events?eventDate={event date}`
- **Description**: Retrieves an event with the specified date (in format yyyy-mm-dd).

- **Method**: GET
- **URL**: `http://localhost:3000/events?venueId={venue ID}`
- **Description**: Retrieves an event with the specified venue ID.

- **Method**: GET
- **URL**: `http://localhost:3000/events?venueName={venue name}`
- **Description**: Retrieves an event with the specified venue name.

##### 2. Create Event

- **Method**: POST
- **URL**: `http://localhost:3000/events`
- **Body**: JSON (e.g., `{"name": "Tech Fair", "date": "2023-09-15", "venue_id": 1}`)
- **Description**: Creates a new event with the provided details.

##### 3. Update Event

- **Method**: PUT
- **URL**: `http://localhost:3000/events/{event ID}`
- **Body**: JSON (e.g., `{"name": "Updated Event Name", "date": "2023-11-15", "venue_id": 3}`)
- **Description**: Updates the details of an existing event. It is possible to update just name, date, or venue ID.

#### VENUES

##### 1. Get Venues

- **Method**: GET
- **URL**: `http://localhost:3000/venues`
- **Description**: Retrieves a list of all venues.

- **Method**: GET
- **URL**: `http://localhost:3000/venues?venueId={venue ID}`
- **Description**: Retrieves a venue with the specified ID.

- **Method**: GET
- **URL**: `http://localhost:3000/venues?venueName={venue name}`
- **Description**: Retrieves a venue with the specified name.

- **Method**: GET
- **URL**: `http://localhost:3000/venues?venueLocation={venue location}`
- **Description**: Retrieves a venue with the specified location.

- **Method**: GET
- **URL**: `http://localhost:3000/venues?eventId={event ID}`
- **Description**: Retrieves a venue with the specified event ID.

- **Method**: GET
- **URL**: `http://localhost:3000/venues?eventName={event name}`
- **Description**: Retrieves a venue with the specified event name.

##### 2. Create Venue

- **Method**: POST
- **URL**: `http://localhost:3000/venues`
- **Body**: JSON (e.g., `{"name": "Hilton Hotel", "location": "WestSide"}`)
- **Description**: Creates a new venue with the provided details.

##### 3. Update Venue

- **Method**: PUT
- **URL**: `http://localhost:3000/venues/{venue ID}`
- **Body**: JSON (e.g., `{"name": "Updated Venue Name", "location": "Updated location name"}`)
- **Description**: Updates the details of an existing venue. It is possible to update just name or location.

#### SPEAKERS

##### Get Speakers

- **Method**: GET
- **URL**: `http://localhost:3000/speakers`
- **Description**: Retrieves a list of all speakers.

- **Method**: GET
- **URL**: `http://localhost:3000/speakers?speakersId={speakers ID}`
- **Description**: Retrieves a speaker with the specified ID.

- **Method**: GET
- **URL**: `http://localhost:3000/speakers?speakerName={speaker name}`
- **Description**: Retrieves a speaker with the specified name.

- **Method**: GET
- **URL**: `http://localhost:3000/speakers?speakerBio={speaker bio}`
- **Description**: Retrieves a speaker with the specified bio.

- **Method**: GET
- **URL**: `http://localhost:3000/speakers?eventId={event ID}`
- **Description**: Retrieves a speaker with the specified event ID.

- **Method**: GET
- **URL**: `http://localhost:3000/speakers?eventName={event name}`
- **Description**: Retrieves a speaker with the specified event name.

##### 2. Create Speaker

- **Method**: POST
- **URL**: `http://localhost:3000/speakers`
- **Body**: JSON (e.g., `{"name": "John Smith", "bio": "Senior developer", "event_id": 3}`)
- **Description**: Creates a new speaker with the provided details.

##### 3. Update Speaker

- **Method**: PUT
- **URL**: `http://localhost:3000/speakers/{speaker ID}`
- **Body**: JSON (e.g., `{"name": "Updated Speaker Name", "bio": "Updated bio", "event_id": 4}`)
- **Description**: Updates the details of an existing speaker. It is possible to update just name, bio, or event ID.
