const router = require("express").Router();
const EventModel = require("../models/Event.model");

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

module.exports = router;
