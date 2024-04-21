const Report = require("../models/report.model");
const BaseController = require("./base.controller");

function ReportController() {
  const baseController = BaseController;

  this.findAll = async (req, res) => {
    try {
      const { page, limit } = req.query;
      let query = baseController.appendFilters({}, {});

      const { results, pagination } = await baseController.pagination(
        Report,
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
      const report = new Report(req.body);
      await report.save({ runValidators: true });
      res.status(201).json({ data: report });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  this.find = async (req, res) => {
    try {
      const reportId = req.params.id;
      const report = await Report.findById(reportId);
      if (!report) {
        return res.status(404).json({ error: "Report not found" });
      }
      res.json({ data: report });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  this.update = async (req, res) => {
    try {
      const reportId = req.params.id;
      const report = await Report.findByIdAndUpdate(reportId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!report) {
        return res.status(404).json({ error: "Report not found" });
      }
      res.json({ data: report });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  this.remove = async (req, res) => {
    try {
      const reportId = req.params.id;
      const report = await Report.findByIdAndDelete(reportId);
      if (!report) {
        return res.status(404).json({ error: "Report not found" });
      }
      res.json({ message: "Report deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  return this;
}

module.exports = new ReportController();
