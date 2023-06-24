const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/jwt.auth");

const saltRounds = 12;

router.post("/signup", async (req, res) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const newUser = await User.create({
    username: req.body.username,
    password: hash,
  });
  res.status(201).json(newUser);
});

router.post("/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    if (foundUser) {
      const passwordMatch = bcrypt.compareSync(
        req.body.password,
        foundUser.password
      );
      if (passwordMatch) {
        const { _id, username } = foundUser;
        const payload = { _id, username };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        res.status(200).json({ authToken });
      }
    } else {
      res.status(400).json({ message: "username or password do not match" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/verify", isAuthenticated, (req, res) => {
  console.log("here is our payload", req.payload);
  const { _id } = req.payload;
  if (req.payload) {
    res.status(200).json({ user: req.payload });
  }
});

module.exports = router;
