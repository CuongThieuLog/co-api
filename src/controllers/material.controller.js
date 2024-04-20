const Material = require("../models/Material");
const BaseController = require("./base.controller");

function MaterialController() {
  const baseController = BaseController;

  this.findAll = async (req, res) => {
    try {
      const { page, limit, material_name } = req.query;
      let query = baseController.appendFilters({}, { material_name });

      const { results, pagination } = await baseController.pagination(
        Material,
        query,
        page,
        limit
      );

      res.json({ data: results, pagination: pagination });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  this.create = async (req, res) => {
    try {
      const material = new Material(req.body);
      await material.save();
      res.status(201).json({ data: material });
    } catch (error) {
      res.status(400).json({ error: "Internal Server Error" });
    }
  };

  this.find = async (req, res) => {
    try {
      const materialId = req.params.id;
      const material = await Material.findById(materialId);
      if (!material) {
        return res.status(404).json({ error: "Material not found" });
      }
      res.json(material);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  this.update = async (req, res) => {
    try {
      const materialId = req.params.id;
      const material = await Material.findByIdAndUpdate(materialId, req.body, {
        new: true,
      });
      if (!material) {
        return res.status(404).json({ error: "Material not found" });
      }
      res.json({ data: material });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  this.remove = async (req, res) => {
    try {
      const materialId = req.params.id;
      const material = await Material.findByIdAndRemove(materialId);
      if (!material) {
        return res.status(404).json({ error: "Material not found" });
      }
      res.json({ message: "Material deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  return this;
}

module.exports = MaterialController();
