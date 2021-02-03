const SensorType = require("../models").SensorType;
const BoxUser = require("../models").BoxUser;
const Location = require("../models").Location;
const Measurement = require("../models").Measurement;
const Sensor = require("../models").Sensor;

var dateFormat = require("dateformat");

const { Op } = require("sequelize");

//ssh connection
const { NodeSSH } = require("node-ssh");

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
      //make dictionary for speed
      let sensorDic = {};
      let locationDic = {};

      for (let i = 0; i < measurements.length; i++) {
        let sensor;
        //check sensor
        if (sensorDic[measurements[i].SensorID]) {
          sensor = sensorDic[measurements[i].SensorID];
        } else {
          sensor = await Sensor.findByPk(measurements[i].SensorID, {
            include: { paranoid: true, model: SensorType, as: "SensorType" },
          });
          sensorDic[measurements[i].SensorID] = sensor;
        }

        //location
        let location;
        //check sensor
        if (locationDic[measurements[i].BoxID]) {
          location = locationDic[measurements[i].BoxID];
        } else {
          location = await Location.findOne({
            where: { EndDate: null },
            include: [
              {
                all: true,
                where: { BoxID: measurements[i].BoxID, EndDate: null },
              },
            ],
          });
          locationDic[measurements[i].BoxID] = location;
        }

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
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async getOutputData(req, res) {
    const ssh = new NodeSSH();

    // ssh yourivanlaer@uservm.terrascope.be -p 24148
    // bzpkthAM7BnApC5RnhAQ

    ssh
      .connect({
        host: "uservm.terrascope.be",
        username: "yourivanlaer",
        port: "24148",
        password: "bzpkthAM7BnApC5RnhAQ",
      })
      .then(function () {
        ssh
          .putFile(
            __dirname + "/data/text.txt",
            "/home/yourivanlaer/Public/predictions"
          )
          .then(
            function () {
              console.log("The File thing is done");
            },
            function (error) {
              console.log("Something's wrong");
              console.log(error);
            }
          );
      });
  },
};
