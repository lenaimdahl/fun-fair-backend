const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Activity = mongoose.model("activity", activitySchema);

module.exports = Activity;
