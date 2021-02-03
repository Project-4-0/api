const Sensor = require("../models").Sensor;
const Box = require("../models").Box;
const User = require("../models").User;
const SensorType = require("../models").SensorType;

//Models
module.exports = {
  async getWeather(req, res) {
    try {
      return res.status(200).send("ok");
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
