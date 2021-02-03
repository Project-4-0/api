const SensorType = require("../models").SensorType;
const BoxUser = require("../models").BoxUser;
const Location = require("../models").Location;
const Measurement = require("../models").Measurement;
const Sensor = require("../models").Sensor;

var dateFormat = require("dateformat");

const { Op } = require("sequelize");

//ssh connection
const { NodeSSH } = require("node-ssh");
//csv
// const csv = require("csv-parser");
// const fs = require("fs");
const csv = require("csvtojson");

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
      return res.status(400).send(error);
    }
  },

  async getOutputData(req, res) {
    const ssh = new NodeSSH();

    // ssh yourivanlaer@uservm.terrascope.be -p 24148
    // bzpkthAM7BnApC5RnhAQ

    try {
      let c = await ssh.connect({
        host: "uservm.terrascope.be",
        username: "yourivanlaer",
        port: "24148",
        password: "bzpkthAM7BnApC5RnhAQ",
      });

      let file = await ssh.getFile(
        __dirname + "/data/output.csv",
        "/home/yourivanlaer/Public/predictions/output.csv"
      );

      //get csv object
      // let row = await fs
      //   .createReadStream(__dirname + "/data/output.csv")
      //   .pipe(csv());
      // // .on("data", (row) => {
      // //   console.log(row);
      // // })
      // // .on("end", () => {
      // //   console.log("CSV file successfully processed");
      // // });

      const rows = await csv().fromFile(__dirname + "/data/output.csv");

      // console.log(rows);

      return res.status(200).send(rows);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
