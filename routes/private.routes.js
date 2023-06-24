const router = require("express").Router();
// const UserModel = require("../models/User.model");
// const EventModel = require("../models/Event.model");
// const MoodModel = require("../models/Mood.model");
// const ActivityModel = require("../models/Activity.model");

//router expects a get from frontend in combination with axios.get

//router expects an post from frontend in combination with axios.post to update database
//   /api not needed, because defined in index.routes.js
router.post("/mood", async (req, res) => {
  try {
    const userId = req.payload._id;
    console.log(userId);
    // const user = await UserModel.findById(userId);
    // const allEvents = await EventModel.find({
    //   user,
    //   _id,
    //   title,
    //   image,
    //   points,
    // });
    // const allMoods = await MoodModel.find({
    //   user,
    //   _id,
    //   type,
    // });
    // res.status(200).json({ allEvents, allMoods });
    res.status(200);
  } catch (err) {
    console.error("ERROR while getting selected user data :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
