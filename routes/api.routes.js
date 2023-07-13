const router = require("express").Router();
const MoodModel = require("../models/Mood.model");
const ActivityModel = require("../models/Activity.model");
const EventModel = require("../models/Event.model");
const UserModel = require("../models/User.model");
const TextModel = require("../models/Text.model");

router.get("/nonfriends", async (req, res) => {
  try {
    const ownUserId = req.payload._id;
    const { friends: myFriends } = await UserModel.findById(ownUserId);
    const allUsers = await UserModel.find();
    const nonFriends = allUsers.filter((user) => {
      return user._id.toString() !== ownUserId && !myFriends.includes(user._id);
    });
    res.status(200).json({ users: nonFriends });
  } catch (err) {
    console.error("ERROR while fetching all user from db :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/friends", async (req, res) => {
  try {
    const ownUserId = req.payload._id;
    const { friends: myFriends } = await UserModel.findById(ownUserId);
    res.status(200).json({ friends: myFriends });
  } catch (err) {
    console.error("ERROR while fetching all user from db :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/addFriend", async (req, res) => {
  try {
    const ownUserId = req.payload._id;
    const { userId } = req.body;
    const pushFriendToUser = await UserModel.findByIdAndUpdate(ownUserId, {
      $push: { friends: userId },
    });
    res.status(200).json({ pushFriendToUser });
  } catch (err) {
    console.error("ERROR while adding an friend :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/mood", async (req, res) => {
  try {
    console.log(req.body);
    const { timestamp, title } = req.body;
    const userId = req.payload._id;
    const savedMood = await MoodModel.create({
      user: userId,
      timestamp,
      title,
    });
    res.status(200).json({ savedMood });
  } catch (err) {
    console.error("ERROR while getting selected user data :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/moods", async (req, res) => {
  try {
    const userId = req.payload._id;
    const moods = await MoodModel.find({ user: userId });
    res.status(200).json({ moods });
  } catch (err) {
    console.error("ERROR while getting selected user data :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/activity", async (req, res) => {
  try {
    console.log(req.body);
    const { title } = req.body;
    const savedActivity = await ActivityModel.create({
      title,
    });
    res.status(200).json({ savedActivity });
  } catch (err) {
    console.error("ERROR while getting selected user data :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/events-calendar", async (req, res) => {
  try {
    const userId = req.payload._id;
    const events = await EventModel.find({ user: userId });
    res.status(200).json({ events });
  } catch (err) {
    console.error("ERROR fetching events from DB to calendar", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/event", async (req, res) => {
  try {
    const userId = req.payload._id;
    const { title, image, points, timestamp } = req.body;
    const eventAddedToCal = await EventModel.create({
      user: userId,
      title,
      image,
      points,
      timestamp,
    });

    const pushEventToUser = await UserModel.findByIdAndUpdate(userId, {
      $push: { eventsInCalendar: eventAddedToCal._id },
    });

    res.status(200).json({ pushEventToUser });
  } catch (err) {
    console.error("ERROR while adding an event :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/new-event", async (req, res) => {
  try {
    const { title, image, points } = req.body;
    const savedEvent = await EventModel.create({
      title,
      image,
      points,
    });
    res.status(200).json({ savedEvent });
  } catch (err) {
    console.error("ERROR while adding an event :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/events", async (req, res) => {
  try {
    const allEvents = await EventModel.find();
    res.status(200).json({ allEvents });
  } catch (err) {
    console.error("ERROR while fetching all events from db :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/search", async (req, res) => {
  try {
    const { startDate } = req.body;
    const allEvents = await EventModel.find({ timestamp: { $eq: startDate } });
    const allEntries = await TextModel.find({ timestamp: { $eq: startDate } });
    res.status(200).json({ allEvents, allEntries });
  } catch (err) {
    console.error("ERROR while fetching all events from db :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/text", async (req, res) => {
  try {
    const userId = req.payload._id;
    const { text, timestamp } = req.body;
    const savedText = await TextModel.create({
      user: userId,
      text,
      timestamp,
    });
    res.status(200).json({ savedText });
  } catch (err) {
    console.error("ERROR while adding a text :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
