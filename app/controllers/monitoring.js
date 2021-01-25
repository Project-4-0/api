const Monitoring = require("../models").Monitoring;
const Box = require("../models").Box;

//Validation SensorType
monitoringValidate = (req, res) => {
  let validationMessages = [];

  if (!req.body.BoxID) {
    validationMessages.push("BoxID is required.");
  }

  if (!req.body.SDCapacity) {
    validationMessages.push("SDCapacity is required.");
  }

  if (!req.body.BatteryStatus) {
    validationMessages.push("Unit is required.");
  }

  if (!req.body.BatteryPercentage) {
    validationMessages.push("BatteryPercentage is required.");
  }

  return validationMessages;
};

//Check if exist
async function sensorTypeExist(val) {
  return await Monitoring.findOne({
    where: { MonitoringID: val },
  });
}

//Models
module.exports = {
  list(req, res) {
    SensorType.findAll()
      .then((monitoring) => res.status(200).send(monitoring))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    SensorType.findByPk(req.params.id, {
      include: [
        {
          model: Box,
          as: "Box",
        },
      ],
    })
      .then((val) => {
        if (!val) {
          return res.status(404).send({
            message: "Monitoring Not Found",
          });
        }
        return res.status(200).send(val);
      })
      .catch((error) => res.status(400).send(error));
  },

  async add(req, res) {
    //validation
    let validationMessages = monitoringValidate(req, res);

    if (validationMessages.length != 0) {
      return res.status(400).send({ messages: validationMessages });
    }

    //create
    SensorType.create({
      BoxID: req.body.BoxID,
      SDCapacity: req.body.SDCapacity,
      BatteryStatus: req.body.BatteryStatus,
      BatteryPercentage: req.body.BatteryPercentage,
    })
      .then((monitoring) => res.status(201).send(monitoring))
      .catch((error) => res.status(400).send(error));
  },

};
