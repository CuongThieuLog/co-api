const Material = require("../models/material.model");
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
      res.status(500).json({ error: error.message });
    }
  };

  this.create = async (req, res) => {
    try {
      const material = new Material(req.body);
      await material.save();
      res.status(201).json({ data: material });
    } catch (error) {
      res.status(400).json({ error: error.message });
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
      res.status(500).json({ error: error.message });
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
      res.status(400).json({ error: error.message });
    }
  };

  this.remove = async (req, res) => {
    try {
      const materialId = req.params.id;
      const material = await Material.findByIdAndDelete(materialId);
      if (!material) {
        return res.status(404).json({ error: "Material not found" });
      }
      res.json({ message: "Material deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  this.findAllKeyValue = async (req, res) => {
    try {
      const materials = await Material.find();

      const keyValueMaterial = materials.map((mr) => ({
        label: mr.material_name,
        value: mr._id,
      }));

      res.json(keyValueMaterial);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  return this;
}

module.exports = MaterialController();
