const router = require("express").Router();
const EntryModel = require("../models/Entry.model");

router.post("/entry/search", async (req, res) => {
  try {
    const userId = req.payload._id;
    const { startDate } = req.body;
    const allEntries = await EntryModel.find({
      user: userId,
      timestamp: { $eq: startDate },
    });
    res.status(200).json({ allEntries });
  } catch (err) {
    console.error("ERROR while fetching all entries from db :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/entry", async (req, res) => {
  try {
    const userId = req.payload._id;
    const { text, timestamp } = req.body;
    const savedEntry = await EntryModel.create({
      user: userId,
      text,
      timestamp,
    });
    res.status(200).json({ savedEntry });
  } catch (err) {
    console.error("ERROR while adding the entry :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/entry/:entryId", async (req, res) => {
  try {
    const userId = req.payload._id;
    const { entryId } = req.params;
    const entry = await EntryModel.findById(entryId);
    if (userId !== entry.user.toString()) {
      res.sendStatus(401);
      return;
    }
    await entry.deleteOne();
    res.sendStatus(200);
  } catch (err) {
    console.error("ERROR while deleting the entry :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/entry/:entryId", async (req, res) => {
  try {
    const userId = req.payload._id;
    const { entryId } = req.params;
    const { text } = req.body;
    const entry = await EntryModel.findById(entryId);
    if (userId !== entry.user.toString()) {
      res.sendStatus(401);
      return;
    }
    await entry.updateOne({ text });
    res.sendStatus(200);
  } catch (err) {
    console.error("ERROR while updating the entry :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
