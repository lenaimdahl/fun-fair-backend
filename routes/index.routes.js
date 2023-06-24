const router = require("express").Router();
const MoodModel = require("../models/Mood.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/api/mood", async (req, res) => {
  try {
    console.log(req.payload);
    // const allMoods = await MoodModel.
  } catch (error) {
    console.log("There was an error", error);
  }
});

// Mood;

// router.postMood;

// router.getActivity;

// router.postActivity;

// router.getDrink;

// router.postDrink;

module.exports = router;
