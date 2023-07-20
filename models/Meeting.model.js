const { Schema, model } = require("mongoose");

const meetingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
  },
  friend: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Meeting = model("meeting", meetingSchema);

module.exports = Meeting;
