const Project = require("../models/project.model");
const BaseController = require("./base.controller");

function ProjectController() {
  const baseController = BaseController;

  this.findAll = async (req, res) => {
    try {
      const { page, limit, project_name } = req.query;
      let query = baseController.appendFilters({}, { project_name });

      const { results, pagination } = await baseController.pagination(
        Project,
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
      const project = new Project(req.body);
      await project.save();
      res.status(201).json({ data: project });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  this.find = async (req, res) => {
    try {
      const projectId = req.params.id;
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json({ data: project });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  this.update = async (req, res) => {
    try {
      const projectId = req.params.id;
      const project = await Project.findByIdAndUpdate(projectId, req.body, {
        new: true,
      });
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json({ data: project });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  this.remove = async (req, res) => {
    try {
      const projectId = req.params.id;
      const project = await Project.findByIdAndRemove(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  return this;
}

module.exports = ProjectController();
