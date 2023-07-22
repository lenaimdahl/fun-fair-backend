const router = require("express").Router();
const MoodModel = require("../models/Mood.model");

router.post("/mood", async (req, res) => {
  try {
    const { timestamp, title } = req.body;
    const userId = req.payload._id;

    const timestampDate = new Date(timestamp);
    const currentDay = new Date(
      timestampDate.getFullYear(),
      timestampDate.getMonth(),
      timestampDate.getDate()
    );

    // Check if a mood already exists for the current day
    const existingMood = await MoodModel.findOne({
      user: userId,
      timestamp: { $gte: currentDay, $lt: currentDay + 86400000 }, // Check within the current day range (24 hours)
    });

    if (existingMood) {
      return res
        .status(400)
        .json({ message: "A mood has already been added for today" });
    }

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

router.get("/mood/:timestamp", async (req, res) => {
  try {
    const userId = req.payload._id;
    const { timestamp } = req.params;
    const moods = await MoodModel.find({
      user: userId,
      timestamp,
    });

    res.status(200).json({ moods });
  } catch (err) {
    console.error("ERROR while getting selected user data :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/moods", async (req, res) => {
  try {
    const userId = req.payload._id;
    const moods = await MoodModel.find({
      user: userId,
    });

    res.status(200).json({ moods });
  } catch (err) {
    console.error("ERROR while getting selected user data :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
