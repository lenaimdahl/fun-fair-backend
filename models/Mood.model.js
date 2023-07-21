const { Schema, model } = require("mongoose");

const moodSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    enum: ["happy", "sad", "angry", "in love", "sleepy"],
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
});

const Mood = model("Mood", moodSchema);

module.exports = Mood;

// '😊' (happy), '😔' (sad), '😡' (angry), '😍' (in love), and '😴' (sleepy).
