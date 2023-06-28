const EventModel = require("../models/Event.model")
console.log(process.cwd());
require("dotenv").config();

// first thing when seeding is to connect to the DB
require("../db");

// To insert in "seeds/movies.seed.js"
console.log(process.env.MONGODB_URI);
const events = [
  {
    title: "watching my favourite movie home",
    image: "🍿",
    points: 20
  },
  {
    title: "going out dancing",
    image: "💃",
    points: 20
  },
  {
    title: "playing pool",
    image: "🎱",
    points: 20
  },
  {
    title: "going out for a drink with a friend",
    image: "🍹",
    points: 20
  },
  {
    title: "going to a football game",
    image: "⚽",
    points: 20
  },
  {
    title: "organising a picknick with friends",
    image: "🧺",
    points: 20
  },
  
];

// Add here the script that will be run to actually seed the database (feel free to refer to the previous lesson)

// ... your code here

const seedDB = async () => {
  try {
    const seededEvents = await EventModel.insertMany(events);
    console.log("Great job, the DB is now seeded", seededEvents);
  } catch (err) {
    console.log("there was a problem while seeding", err);
  }
};
seedDB();