const router = require("express").Router();
const User = require("../models/User");
const Message = require("../models/Message");
const bcrypt = require("bcrypt");

//? UPDATE WITH PASS
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const user = await User.findById(req.body.userId);
      const { password } = user;
      const verified = bcrypt.compareSync(req.body.password, password);
      if (verified) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          return res.status(200).json(updatedUser);
        } catch (err) {
          return res.status(500).json(err);
        }
      } else {
        console.log(req.body.password, password, verified);
        return res.status(403).json({ valid: true });
      }
    }
  } else {
    return res.status(401).json("You can update only your account!");
  }
});

//? UPDATE WITHOUT PASS
router.put("/nopass/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(401).json("You can update only your account!");
    }
  }
});

//? DELETE

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Message.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("User has been deleted!");
      } catch (err) {
        return res.status(500).json(err);
      }
    } catch (err) {
      return res.status(404).json("User not found!");
    }
  } else {
    return res.status(401).json("You can delete only your account!");
  }
});

//? GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//? GET USER MESSAGES
router.get("/messages/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
