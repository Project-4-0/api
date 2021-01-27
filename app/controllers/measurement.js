const Measurement = require("../models").Measurement;
const Sensor = require("../models").Sensor;
const Box = require("../models").Box;

const sequelize = require("../models/index").sequelize;

//Validation Measurement
measurementValidate = (req, res) => {
  let validationMessages = [];

  if (!req.body.BoxID) {
    validationMessages.push("BoxID is required.");
  }

  if (!req.body.SensorID) {
    validationMessages.push("SensorID is required.");
  }

  if (!req.body.Value) {
    validationMessages.push("Value is required.");
  }

  return validationMessages;
};

//Check if exist

//Models
module.exports = {
  list(req, res) {
    Measurement.findAll()
      .then((measurement) => res.status(200).send(measurement))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    Measurement.findByPk(req.params.id, {
      include: [
        {
          model: Sensor,
          as: "Sensor",
        },
        {
          model: Box,
          as: "Box",
        },
      ],
    })
      .then((val) => {
        if (!val) {
          return res.status(404).send({
            message: "Measurement Not Found",
          });
        }
        return res.status(200).send(val);
      })
      .catch((error) => res.status(400).send(error));
  },

  //Create
  async add(req, res) {
    //validation
    let validationMessages = measurementValidate(req, res);

    //if (validationMessages.length != null) {
    //  return res.status(400).send({ messages: validationMessages });
    //}

    //TODO BOX

    //TODO SensorID
    // var sensor = await Sensor.findByPk(1);

    // let sensor = await Sensor.findByPk(req.body.SensorID);
    // if (sensor == null) {
    //   return res.status(400).send({ message: "SensorID not found" });
    // }
    // console.log(sensor);

    // const users = await sequelize.query("SELECT * FROM User", {
    //   type: QueryTypes.SELECT,
    // });
    // console.log("user", users);

    // console.log(await sequelize.query("SELECT * FROM box"));

    //Test
    // const users = sequelize
    //   .query('SELECT * FROM "Box"', {
    //     type: sequelize.QueryTypes.SELECT,
    //   })
    //   .then((val) => console.log(val));

    // console.log(req.body.Value);

    //create
    Measurement.create({
      BoxID: req.body.BoxID,
      SensorID: req.body.SensorID,
      Value: req.body.Value,
      TimeStamp: new Date().toISOString(),
    })
      .then((val) => res.status(201).send(val))
      .catch((error) => res.status(400).send(error));
  },

  //TODO Update functie
  // async update(req, res) {
  //   //validation
  //   let validationMessages = this.measurementValidate(req, res);

  //   if (validationMessages.length != 0) {
  //     return res.status(400).send({ messages: validationMessages });
  //   }

  //   //find
  //   let measurement = await Measurement.findByPk(req.body.MeasurementID);
  //   if (user == null) {
  //     return res.status(400).send({ message: "MeasurementID not found" });
  //   }

  //   //update user
  //   measurement
  //     .update(req.body)
  //     .then((val) => res.status(200).send(val))
  //     .catch((error) => res.status(400).send(error));
  // },

  //Delete functie
  delete(req, res) {
    Measurement.findByPk(req.params.id)
      .then((val) => {
        if (!val) {
          return res.status(400).send({
            message: "MeasurementID Not Found",
          });
        }
        return val
          .destroy()
          .then(() =>
            res
              .status(204)
              .send({ message: "The measurement has succesfully been deleted" })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
