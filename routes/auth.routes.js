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
    email: req.body.email,
    username: req.body.username,
    password: hash,
    weeklyGoal: req.body.weeklyGoal,
  });
  res.status(201).json(newUser);
});

router.post("/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      const passwordMatch = bcrypt.compareSync(
        req.body.password,
        foundUser.password
      );
      if (passwordMatch) {
        const { _id, email, username } = foundUser;
        const payload = { _id, email, username };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        res.status(200).json({ authToken });
      } else {
        res.status(400).json({ message: "email or password do not match" });
      }
    } else {
      res.status(400).json({ message: "email or password do not match" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/verify", isAuthenticated, (req, res) => {
  console.log("here is our payload", req.payload);
  if (req.payload) {
    res.status(200).json({ user: req.payload });
  } else {
    res.sendStatus(200);
  }
});

module.exports = router;
