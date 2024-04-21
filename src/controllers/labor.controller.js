const Labor = require("../models/labor.model");

function LaborController() {
  this.findAllKeyValue = async (req, res) => {
    try {
      const labors = await Labor.find();

      const keyValueLabor = labors.map((lb) => ({
        label: lb.labor_name,
        value: lb._id,
      }));

      res.json(keyValueLabor);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  return this;
}

module.exports = LaborController();
