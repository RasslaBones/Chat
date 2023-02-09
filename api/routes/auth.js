const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const secret = "Grisa123"

//? REGISTER
router.post("/register", async (req, res) => {
  try {
    const userCheck = await User.findOne({ username: req.body.username });
    if (userCheck) return res.status(403).json({ usernameError: true });

    const emailCheck = await User.findOne({ email: req.body.email });
    if (emailCheck) return res.status(403).json({ emailError: true });

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const token = jwt.sign({username: user.username, email: user.email, _id: user._id}, secret, {expiresIn: "168h"})

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    return res.status(200).json({...user, token});
  } catch (err) {
    return res.status(500).json(err);
  }
});

//? LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json("Wrong credentials!");


    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) return res.status(400).json("Wrong credentials!");

    
    const { password, ...others } = user._doc;
    const token = jwt.sign({username: user.username, email: user.email, _id: user._id}, secret, {expiresIn: "168h"})

    return res.status(200).json({...others, token});
  } catch (err) {
    return res.status(500).json(err);
  }
});

//? CHECK UNIQUE USERNAME

router.post("/:username", async (req, res) => {
  try {
    if (req.body.username == true) {
      const user = await User.findOne({ username: req.params.username });
      if (!user) return res.status(200).json(true);
      else return res.status(200).json(false);
    }
    if (req.body.email == true) {
      const email = await User.findOne({ email: req.params.username });
      if (!email) return res.status(200).json(true);
      else return res.status(200).json(false);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/remember", async (req,res) => {
  try{
    const token = req.headers.token

    if(token){
      const verification = jwt.verify(token, secret)
      if(!verification)
        return res.status(400).json("Session Expired!")
      
        const decodedUser = jwt.decode(token, secret)
        const user = await User.findOne({ _id: decodedUser._id });
        const { password, ...others } = user._doc;

        return res.status(200).json(others)
    }
    return res.status(400).json("Token is undefined!")
  } catch(err){
    return res.status(500).json(err)
  }
})
module.exports = router;
