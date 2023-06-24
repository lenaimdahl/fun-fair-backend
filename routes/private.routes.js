const router = require("express").Router();
// const UserModel = require("../models/User.model");
// const EventModel = require("../models/Event.model");
const MoodModel = require("../models/Mood.model");
// const ActivityModel = require("../models/Activity.model");

//router expects a get from frontend in combination with axios.get

//router expects an post from frontend in combination with axios.post to update database
//   /api not needed, because defined in index.routes.js
router.post("/mood", async (req, res) => {
  try {
    console.log(req.body);
    const { timestamp, type } = req.body;
    const userId = req.payload._id;
    const savedMood = await MoodModel.create({
      user: userId,
      timestamp,
      type,
    });
    res.status(200).json({ savedMood });
  } catch (err) {
    console.error("ERROR while getting selected user data :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
