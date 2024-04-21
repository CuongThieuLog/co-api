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
      res.status(500).json({ error: error.message });
    }
  };

  this.create = async (req, res) => {
    try {
      const project = new Project(req.body);
      await project.save({ runValidators: true });
      res.status(201).json({ data: project });
    } catch (error) {
      res.status(400).json({ error: error.message });
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
      res.status(500).json({ error: error.message });
    }
  };

  this.update = async (req, res) => {
    try {
      const projectId = req.params.id;
      const project = await Project.findByIdAndUpdate(projectId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json({ data: project });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  this.remove = async (req, res) => {
    try {
      const projectId = req.params.id;
      const project = await Project.findByIdAndDelete(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  this.findAllKeyValue = async (req, res) => {
    try {
      const projects = await Project.find();

      const keyValueProject = projects.map((project) => ({
        label: project.project_name,
        value: project._id,
      }));

      res.json(keyValueProject);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  return this;
}

module.exports = ProjectController();
