const Project = require("../models/project.model");

function ProjectController() {
  this.findAll = async (req, res) => {
    try {
      const projects = await Project.find();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  this.create = async (req, res) => {
    try {
      const project = new Project(req.body);
      await project.save();
      res.status(201).json(project);
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
      res.json(project);
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
      res.json(project);
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
