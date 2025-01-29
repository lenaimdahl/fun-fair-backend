# FunFair Backend

## Go to [FunFair app](https://funfair.netlify.app/)

## Go to [FunFair Frontend](https://github.com/lenaimdahl/fun-fair-frontend)

## Introduction

FunFair Backend is the server-side application that powers the FunFair Calendar app. It handles data storage, retrieval, and API requests from the front-end application.

## Technologies

- Node.js: JavaScript runtime for server-side development.
- Express.js: Backend web application framework for handling routes and requests.
- MongoDB: NoSQL database for storing user and event data.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/lenaimdahl/funfair-backend.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the MongoDB database:

   - Install MongoDB if you haven't already (https://docs.mongodb.com/manual/installation/).
   - Configure the MongoDB connection in the app's configuration file.

4. Open your browser and go to http://localhost:3000 to access Funfair locally.

## API Endpoints

### User-related Endpoints

- GET /api/user: Get the authenticated user's information.
- GET /api/nonfriends: Get a list of users who are not friends with the authenticated user.
- GET /api/friends: Get a list of friends for the authenticated user.
- POST /api/addFriend: Add a new friend for the authenticated user.
- DELETE /api/friend/:friendsId: Remove a friend from the authenticated user's friend list.
- PATCH /api/newGoal: Update the weekly goal for the authenticated user.

### Entry-related Endpoints

- POST /api/entry/search: Get all entries for a specific date (timestamp) for the authenticated user.
- POST /api/entry: Add a new entry for the authenticated user.
- - DELETE /api/entry/:entryId: Delete an entry for the authenticated user by entry ID.
- PATCH /api/entry/:entryId: Update the text content of an entry for the authenticated user.

### Event-related Endpoints

- POST /api/new-event: Add a new event to the database.
- GET /api/events: Get a list of all events in the database.
  Meeting-related Endpoints
- GET /api/meetings-calendar: Get all meetings for the authenticated user for display on the calendar.
- POST /api/meeting: Add a new meeting for the authenticated user.
- DELETE /api/meeting/:meetingId: Delete a meeting for the authenticated user by meeting ID.

### Mood-related Endpoints

- POST /api/mood: Add a new mood entry for the authenticated user.
- GET /api/mood/:timestamp: Get all mood entries for a specific date (timestamp) for the authenticated user.
- GET /api/moods: Get all mood entries for the authenticated user.

## Contributing

Contributions are welcome! If you find a bug or want to add a new feature, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Author

This app was created by [Lena Imdahl](https://github.com/lenaimdahl) and [Olga Martyniuk](https://github.com/olga321go). If you have any questions or feedback, please feel free to [open an issue](https://github.com/lenaimdahl/Nasa-Library/issues/new). 🙂
Thank you for using Galaxia! We hope you enjoy exploring the wonders of space.

```

```
