const { Schema, model } = require("mongoose");

const entrySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Entry = model("entry", entrySchema);

module.exports = Entry;
