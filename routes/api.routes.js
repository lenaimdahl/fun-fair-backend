const router = require("express").Router();
const MoodModel = require("../models/Mood.model");
// const EventModel = require("../models/Event.model");
const ActivityModel = require("../models/Activity.model");
const EventModel = require("../models/Event.model");

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

router.get("/event", async (req, res) => {
  try {
    const userId = req.payload._id;
    const events = await EventModel.find({ user: userId });
    res.status(200).json({ events });
  } catch (err) {
    console.error("ERROR while getting selected user data :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/event", async (req, res) => {
  try {
    const userId = req.payload._id;
    const { title, image, points, timestamp } = req.body;
    const savedEvent = await EventModel.create({
      user: userId,
      title,
      image,
      points,
      timestamp,
    });
    res.status(200).json({ savedEvent });
  } catch (err) {
    console.error("ERROR while adding an event :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
