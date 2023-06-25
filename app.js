require("dotenv").config();
require("./db");

const express = require("express");
const app = express();

require("./config")(app);

const { isAuthenticated } = require("./middlewares/jwt.auth");

const privateRoutes = require("./routes/api.routes");
app.use("/api", isAuthenticated, privateRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

require("./error-handling")(app);

module.exports = app;
