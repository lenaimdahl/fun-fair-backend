const router = require("express").Router();
const ActivityModel = require("../models/Activity.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
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
    console.error("ERROR while getting activity data :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
