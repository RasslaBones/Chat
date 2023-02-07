const router = require("express").Router();
const Message = require("../models/Message");
const User = require("../models/User");

//? CREATE
router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);
  const user = await User.findOne({ _id: newMessage.userId });
  newMessage.username = user.username;
  try {
    const savedMessage = await newMessage.save();
    return res.status(200).json(savedMessage);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//? DELETE

router.delete("/:id", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message.username === req.body.username) {
      try {
        await message.delete();
        return res.status(200).json("Message has been deleted!");
      } catch (err) {
        return res.status(500).json(err);
      }
    }
  } catch (err) {
    return res.status(404).json("User not found!");
  }
});

//? GET
router.get("/:id", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    return res.status(200).json(message);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//? GET ALL
router.get("/", async (req, res) => {
  try {
    let messages;
    messages = await Message.find();
    for await (item of messages) {
      const user = await User.findOne({ _id: item.userId });
      item.username = user.username;
    }
    return res.status(200).json(messages);
  } catch (err) {
    return res.status(500).json(err);
  }
});
module.exports = router;
