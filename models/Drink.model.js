const mongoose = require("mongoose");

const drinkSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    enum: ["🍹", "🍺", "🍷", "🥤", "🍵", "🍸", "🥂", "🍶"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Drink = mongoose.model("Drink", drinkSchema);

module.exports = Drink;
