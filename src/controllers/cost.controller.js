const Cost = require("../models/cost.model");
const BaseController = require("./base.controller");

function CostController() {
  const baseController = BaseController;

  this.findAll = async (req, res) => {
    try {
      const { page, limit } = req.query;
      let query = baseController.appendFilters({}, {});

      const { results, pagination } = await baseController.pagination(
        Cost,
        query,
        page,
        limit
      );

      res.json({ data: results, pagination: pagination });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  this.create = async (req, res) => {
    try {
      const cost = new Cost(req.body);
      await cost.save();
      res.status(201).json({ data: cost });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  this.find = async (req, res) => {
    try {
      const costId = req.params.id;
      const cost = await Cost.findById(costId);
      if (!cost) {
        return res.status(404).json({ error: "Cost not found" });
      }
      res.json(cost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  this.update = async (req, res) => {
    try {
      const costId = req.params.id;
      const cost = await Cost.findByIdAndUpdate(costId, req.body, {
        new: true,
      });
      if (!cost) {
        return res.status(404).json({ error: "Cost not found" });
      }
      res.json({ data: cost });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  this.remove = async (req, res) => {
    try {
      const costId = req.params.id;
      const cost = await Cost.findByIdAndDelete(costId);
      if (!cost) {
        return res.status(404).json({ error: "Cost not found" });
      }
      res.json({ message: "Cost deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  return this;
}

module.exports = CostController();
