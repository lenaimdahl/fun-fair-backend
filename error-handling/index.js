module.exports = (app) => {
  app.use((_req, res) => {
    // this middleware runs whenever requested page is not available
    res.status(404).json({ message: "This route does not exist" });
  });

  app.use((err, req, res) => {
    // whenever you call next(err), this middleware will handle the error
    // always logs the error
    console.error("ERROR", req.method, req.path, err);

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      res.status(500).json({
        message: "Internal server error. Check the server console",
      });
    }

    console.error("error!", err);
  });

  app.use((err, _req, res, next) => {
    if (err.name === "UnauthorizedError" || err.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Unable to authenticate the user" });
    } else if (err.name === "TokenExpiredError") {
      res.status(401).json({ message: "Access token is expired" });
    } else {
      console.info("unknown error:", err.name);
      next(err);
    }
  });
};
