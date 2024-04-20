const User = require("../models/user.model");
const Labor = require("../models/labor.model");

function UserController() {
  this.find = async (req, res) => {
    return res.send(req.user);
  };

  this.register = (req, res) => {
    try {
      let user = new User();

      user.username = req.body.username;
      user.email = req.body.email;
      user.password = req.body.password;

      user
        .save()
        .then(function () {
          return res.json({ user: user.toAuthJSON() });
        })
        .catch(function (error) {
          return res.status(400).json(error);
        });
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  this.findAll = async (req, res) => {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  this.createUserIsLabor = async (req, res) => {
    console.log(req.body);
    try {
      let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: "admin@123",
      });

      await user.save();

      let labor = new Labor({
        labor_name: req.body.labor_name,
        position: req.body.position,
        rate_per_hour: req.body.rate_per_hour,
      });

      await labor.save();

      user.labor = labor._id;
      await user.save();

      return res.json({ user: user, labor: labor });
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  this.updateUserIsLabor = async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;

    try {
      let user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.username = userData.username || user.username;
      user.email = userData.email || user.email;

      await user.save();

      let labor = await Labor.findById(user.labor);

      if (!labor) {
        return res.status(404).json({ message: "Labor not found" });
      }

      labor.labor_name = userData.labor_name || labor.labor_name;
      labor.position = userData.position || labor.position;
      labor.rate_per_hour = userData.rate_per_hour || labor.rate_per_hour;

      await labor.save();

      return res.json({ user: user, labor: labor });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  return this;
}

module.exports = UserController();
