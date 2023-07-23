const router = require("express").Router();
const MeetingModel = require("../models/Meeting.model");
const UserModel = require("../models/User.model");

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

router.post("/meeting", async (req, res) => {
  try {
    const userId = req.payload._id;
    const { title, image, points, timestamp, friend } = req.body;

    const newMeeting = await MeetingModel.create({
      user: userId,
      title,
      image,
      friend,
      points,
      timestamp,
    });
    await UserModel.findByIdAndUpdate(userId, {
      $push: { meetings: newMeeting._id },
    });
    res.status(200).json({ newMeeting });
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

module.exports = router;
