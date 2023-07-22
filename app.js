require("dotenv").config();
require("./db");

const express = require("express");
const app = express();

require("./config")(app);

const { isAuthenticated } = require("./middlewares/jwt.auth");

const privateRoutes = require("./routes/api.routes");
app.use("/api", isAuthenticated, privateRoutes);

const meetingRoutes = require("./routes/meeting.routes");
app.use("/api", isAuthenticated, meetingRoutes);

const moodRoutes = require("./routes/mood.routes");
app.use("/api", isAuthenticated, moodRoutes);

const eventRoutes = require("./routes/event.routes");
app.use("/api", isAuthenticated, eventRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

require("./error-handling")(app);

module.exports = app;
