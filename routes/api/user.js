const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("config");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator/check");



router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});



router.post(
  "/",
  [
    [
      check("Name", "Name is required").not().isEmpty(),
      check("Email", "Email is required").not().isEmpty(),
      check("Number", "Number is required").not().isEmpty(),
      check("DOB", "DOB is required").not().isEmpty(),

    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      Name,
      Email,
      Number,
      DOB,
    } = req.body;
    const userField = {};
    if (Name) userField.Name = Name;
    if (Email) userField.Email = Email;
    if (Number) userField.Number = Number;
    if (DOB) userField.DOB = DOB;
    console.log("in api")
    // res.send("done");
    try {
      let user = await User.findOne({ Email: Email });//await Post.find({ name: req.params.name });
      console.log("1");
      if (user) {
        user = await User.findOneAndUpdate(
          { Email: Email },
          { $set: userField },
          { new: "true" }
        );
        console.log("updated")
        await user.save();
        return res.json(user);
      }
      console.log("in create");
      user = new User(userField);
      await user.save();
      return res.json(user);
    } catch (err) {
      res.status(500).send("server error");
    }
  }
);

//delete user

router.delete("/:Email", async (req, res) => {
  try {
    console.log("in delete")
    const user = User.findOne({ Email: req.params.Email });
    await user.remove()
    return res.send("success");
  } catch (err) {
    res.status(500).send("server error");
  }
});


module.exports = router;
