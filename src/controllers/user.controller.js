const User = require("../models/user.model");
const Labor = require("../models/labor.model");
const BaseController = require("./base.controller");

function UserController() {
  const baseController = BaseController;

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
      const { page, limit, role, username } = req.query;

      let query = baseController.appendFilters({}, { role, username });

      const { results, pagination } = await baseController.pagination(
        User,
        query,
        page,
        limit
      );

      const transformedData = await Promise.all(
        results.map(async (user) => {
          const userObj = user.toObject();
          const laborInfo = await Labor.findById(userObj.labor);

          const transformedUser = {
            _id: userObj._id,
            role: userObj.role,
            username: userObj.username,
            email: userObj.email,
            labor: laborInfo,
            createdAt: userObj.createdAt,
            updatedAt: userObj.updatedAt,
          };

          return transformedUser;
        })
      );

      res.status(200).json({
        data: transformedData,
        pagination: pagination,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  this.createUserIsLabor = async (req, res) => {
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
      return res.status(400).json(error.message);
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
      user.role = userData.role || user.role;

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

  this.getUserIsLaborById = async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      let userData = user.toObject();

      delete userData.tokens;

      const labor = await Labor.findById(userData.labor);

      if (!labor) {
        return res.status(404).json({ message: "Labor not found" });
      }

      userData.labor = labor;

      return res.json({ user: userData });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  return this;
}

module.exports = UserController();
