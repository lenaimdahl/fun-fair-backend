const router = require("express").Router();
const UserModel = require("../models/User.model");

router.get("/user", async (req, res) => {
  try {
    const userId = req.payload._id;
    const user = await UserModel.findById(userId);
    res.status(200).json({ user });
  } catch (err) {
    console.error("ERROR while fetching all user from db :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/nonfriends", async (req, res) => {
  try {
    const ownUserId = req.payload._id;
    const { friends: myFriends } = await UserModel.findById(ownUserId);
    const allUsers = await UserModel.find();
    const nonFriends = allUsers.filter((user) => {
      return user._id.toString() !== ownUserId && !myFriends.includes(user._id);
    });
    res.status(200).json({ users: nonFriends });
  } catch (err) {
    console.error("ERROR while fetching nonfriends from db :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/friends", async (req, res) => {
  try {
    const ownUserId = req.payload._id;
    const { friends: myFriends } = await UserModel.findById(ownUserId);
    // Fetches usernames of all friends
    const friendsData = await UserModel.find(
      { _id: { $in: myFriends } },
      "username"
    );

    res.status(200).json({ friends: friendsData });
  } catch (err) {
    console.error("ERROR while fetching friends from db :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/addFriend", async (req, res) => {
  try {
    const ownUserId = req.payload._id;
    const { userId } = req.body;
    const pushFriendToUser = await UserModel.findByIdAndUpdate(ownUserId, {
      $push: { friends: userId },
    });
    res.status(200).json({ pushFriendToUser });
  } catch (err) {
    console.error("ERROR while adding an friend :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/friend/:friendsId", async (req, res) => {
  try {
    const userId = req.payload._id;
    const { friendsId } = req.params;
    const user = await UserModel.findById(userId);
    if (!user.friends.includes(friendsId)) {
      return res.status(404).json({ message: "User not found." });
    }
    const newFriends = user.friends.filter(
      (friend) => friend.toString() !== friendsId
    );
    user.friends = newFriends;
    await user.save();
    res.sendStatus(200);
  } catch (err) {
    console.error("ERROR while deleting the entry :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/newGoal", async (req, res) => {
  try {
    const userId = req.payload._id;
    const { weeklyGoal } = req.body;
    const updateData = {
      weeklyGoal: weeklyGoal,
    };
    // console.log("new goal", updateData);
    const userUpdate = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    res.sendStatus(200);
  } catch (err) {
    console.error("ERROR while adding a new goal :>>", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
