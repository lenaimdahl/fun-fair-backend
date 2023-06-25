const router = require("express").Router();
const MoodModel = require("../models/Mood.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// Mood;

// router.postMood;

// router.getActivity;

// router.postActivity;

// router.getDrink;

// router.postDrink;

module.exports = router;
