const Sensor = require("../models").Sensor;
const Box = require("../models").Box;
const User = require("../models").User;
const SensorType = require("../models").SensorType;

//Models
module.exports = {
  async getAdminDashboardKPI(req, res) {
    try {
      //get users counts
      let userCount = await User.count();

      let boxCountActive = await Box.count({
        where: { Active: true },
      });

      let boxCountNoneActive = await Box.count({
        where: { Active: false },
      });

      return res.status(200).send({
        userCount: userCount,
        boxCount: {
          active: boxCountActive,
          noneActive: boxCountNoneActive,
        },
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
