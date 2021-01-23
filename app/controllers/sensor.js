const Sensor = require("../models").Sensor;

//Validation Sensor
sensorValidate = (req, res) => {
  let validationMessages = [];

  if (!req.body.Name) {
    validationMessages.push("Name is required.");
  }

  if (!req.body.SensorTypeID) {
    validationMessages.push("SensorTypeID is required.");
  }

  return validationMessages;
};

//Check if exist
async function sensorExist(val) {
  return await Sensor.findOne({
    where: { Name: val },
  });
}

//Models
module.exports = {
  list(req, res) {
    Sensor.findAll()
      .then((sensor) => res.status(200).send(sensor))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    Sensor.findByPk(req.params.id)
      .then((val) => {
        if (!val) {
          return res.status(404).send({
            message: "Sensor Not Found",
          });
        }
        return res.status(200).send(val);
      })
      .catch((error) => res.status(400).send(error));
  },

  async add(req, res) {
    //validation
    let validationMessages = sensorValidate(req, res);

    if (validationMessages.length != 0) {
      return res.status(400).send({ messages: validationMessages });
    }

    //already exist
    if ((await sensorExist(req.body.Name)) != null) {
      return res.status(400).send({ message: "Name already exist!" });
    }

    //create
    Sensor.create({
      Name: req.body.Name,
      SensorTypeID: req.body.SensorTypeID,
    })
      .then((sensor) => res.status(201).send(sensor))
      .catch((error) => res.status(400).send(error));
  },

  async update(req, res) {
    //validation
    let validationMessages = sensorValidate(req, res);

    if (validationMessages.length != 0) {
      return res.status(400).send({ messages: validationMessages });
    }

    //find
    let sensor = await Sensor.findByPk(req.body.SensorID);
    if (sensor == null) {
      return res.status(400).send({ message: "SensorID not found" });
    }

    //update sensor
    sensor
      .update(req.body)
      .then((val) => res.status(200).send(val))
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    Sensor.findByPk(req.params.id)
      .then((val) => {
        if (!val) {
          return res.status(400).send({
            message: "SensorID Not Found",
          });
        }
        return val
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
