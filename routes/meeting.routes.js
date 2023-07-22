const router = require("express").Router();
const MeetingModel = require("../models/Meeting.model");
const TextModel = require("../models/Text.model");

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

router.post("/meetings", async (req, res) => {
  try {
    const userId = req.payload._id;
    const { title, image, points, timestamp, friend } = req.body;
    const friendId = friend === "" ? null : friend;

    const meetingsAddedToCal = await MeetingModel.create({
      user: userId,
      title,
      image,
      friend: friendId,
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

router.delete("/meeting/:meetingId", async (req, res) => {
  try {
    const userId = req.payload._id;
    const { meetingId } = req.params;
    const meeting = await MeetingModel.findById(meetingId);
    if (userId !== meeting.user.toString()) {
      res.sendStatus(401);
      return;
    }
    await meeting.deleteOne();
    res.sendStatus(200);
  } catch (err) {
    console.error("ERROR while adding a text :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/search", async (req, res) => {
  try {
    const userId = req.payload._id;
    const { startDate } = req.body;
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

module.exports = router;
