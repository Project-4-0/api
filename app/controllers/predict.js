const SensorType = require("../models").SensorType;
const BoxUser = require("../models").BoxUser;
const Location = require("../models").Location;
const Measurement = require("../models").Measurement;
const Sensor = require("../models").Sensor;

var dateFormat = require("dateformat");

const { Op, where } = require("sequelize");

//Models
module.exports = {
  async getInputData(req, res) {
    try {
      var measurements = await Measurement.findAll({
        where: { TimeStamp: { [Op.gte]: new Date(req.body.date) } },
        include: [
          {
            model: Sensor,
            as: "Sensor",
          },
        ],
      });

      let result = [];

      for (let i = 0; i < measurements.length; i++) {
        let sensor = await Sensor.findByPk(measurements[i].SensorID, {
          include: { paranoid: true, model: SensorType, as: "SensorType" },
        });

        var location = await Location.findOne({
          where: { EndDate: null },
          include: [
            {
              all: true,
              where: { BoxID: measurements[i].BoxID, EndDate: null },
            },
          ],
        });

        result.push({
          datum: dateFormat(measurements[i].TimeStamp, "yyyy-mm-dd"),
          boxID: measurements[i].BoxID,
          sensorType: sensor.SensorType.Name,
          value: measurements[i].Value,
          latitude: location != null ? location.Longitude : null,
          longitude: location != null ? location.Latitude : null,
        });
      }

      return res.status(200).send(result);

      //boxUser
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

// 51.157096880208634, 5.033412036915008
