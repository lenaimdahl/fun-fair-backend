const { Schema, model } = require("mongoose");

const moodSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    enum: ["happy", "sad", "angry", "in love", "sleepy"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Mood = model("Mood", moodSchema);

module.exports = Mood;

// '😊' (happy), '😔' (sad), '😡' (angry), '😍' (in love), and '😴' (sleepy).
