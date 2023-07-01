const { Schema, model } = require("mongoose");

const textSchema = new Schema({
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

const Text = model("text", textSchema);

module.exports = Text;
