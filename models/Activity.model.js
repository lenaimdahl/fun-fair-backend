const { Schema, model } = require("mongoose");

const activitySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Activity = model("activity", activitySchema);

module.exports = Activity;
