const router = require("express").Router();
const Message = require("../models/Message");

//? CREATE
router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);
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
  const username = req.query.user;
  try {
    let messages;
    if (username) {
      messages = await Message.find({ username: username });
    } else messages = await Message.find();
    return res.status(200).json(messages);
  } catch (err) {
    return res.status(500).json(err);
  }
});
module.exports = router;
