const router = require("express").Router();
const MoodModel = require("../models/Mood.model");
const ActivityModel = require("../models/Activity.model");
const EventModel = require("../models/Event.model");
const MeetingModel = require("../models/Meeting.model");
const UserModel = require("../models/User.model");
const TextModel = require("../models/Text.model");

router.get("/user", async (req, res) => {
  try {
    const userId = req.payload._id;
    const user = await UserModel.findById(userId);
    res.status(200).json({ user });
  } catch (err) {
    console.error("ERROR while fetching all user from db :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

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
    // Fetches usernames of all friends
    const friendsData = await UserModel.find(
      { _id: { $in: myFriends } },
      "username"
    );

    res.status(200).json({ friends: friendsData });
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
    const { timestamp, title } = req.body;
    const userId = req.payload._id;
    const currentDay = new Date(timestamp).setHours(0, 0, 0, 0);

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

router.get("/moods", async (req, res) => {
  try {
    const userId = req.payload._id;
    const currentDay = new Date().setHours(0, 0, 0, 0);
    const nextDay = new Date(currentDay + 86400000); // Add 24 hours to currentDay

    const moods = await MoodModel.find({
      user: userId,
      timestamp: { $gte: currentDay, $lt: nextDay },
    });

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

router.get("/meetings-calendar", async (req, res) => {
  try {
    const userId = req.payload._id;
    const meetings = await MeetingModel.find({ user: userId });
    res.status(200).json({ meetings });
  } catch (err) {
    console.error("ERROR fetching meetings from DB to calendar", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/event", async (req, res) => {
  try {
    const userId = req.payload._id;
    const { title, image, points, timestamp, friend } = req.body;
    const meetingsAddedToCal = await MeetingModel.create({
      user: userId,
      title,
      image,
      friend,
      points,
      timestamp,
    });

    const pushMeetingToUser = await UserModel.findByIdAndUpdate(userId, {
      $push: { meetings: meetingsAddedToCal._id },
    });

    res.status(200).json({ pushMeetingToUser });
  } catch (err) {
    console.error("ERROR while adding an meeting :>>", err);
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
    const userId = req.payload._id;
    const allMeetings = await MeetingModel.find({
      user: userId,
      timestamp: { $eq: startDate },
    });
    const allEntries = await TextModel.find({
      user: userId,
      timestamp: { $eq: startDate },
    });
    res.status(200).json({ allMeetings, allEntries });
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

router.delete("/text/:entryId", async (req, res) => {
  try {
    const userId = req.payload._id;
    const { entryId } = req.params;
    const entry = await TextModel.findById(entryId);
    if (userId !== entry.user.toString()) {
      res.sendStatus(401);
      return;
    }
    await entry.deleteOne();
    res.sendStatus(200);
  } catch (err) {
    console.error("ERROR while adding a text :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/text/:entryId", async (req, res) => {
  try {
    const userId = req.payload._id;
    const { entryId } = req.params;
    const { text } = req.body;
    const entry = await TextModel.findById(entryId);
    if (userId !== entry.user.toString()) {
      res.sendStatus(401);
      return;
    }
    await entry.updateOne({ text });
    res.sendStatus(200);
  } catch (err) {
    console.error("ERROR while adding a text :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/newGoal", async (req, res) => {
  try {
    const userId = req.payload._id;
    const { weeklyGoal } = req.body;
    const updateData = {
      weeklyGoal: weeklyGoal,
    };
    // console.log("new goal", updateData);
    const userUpdate = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    res.sendStatus(200);
  } catch (err) {
    console.error("ERROR while adding a text :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
