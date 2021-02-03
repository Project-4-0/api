const Measurement = require("../models").Measurement;
const Sensor = require("../models").Sensor;
const Box = require("../models").Box;
const SensorType = require("../models").SensorType;
const BoxUser = require("../models").BoxUser;
// const Sequelize = require("../models/index").Sequelize;
const User = require("../models").User;
const UserType = require("../models").UserType;

const { Op } = require("sequelize");

//Validation Measurement
measurementValidate = (req, res) => {
  let validationMessages = [];

  if (req.body.BoxID === Object) {
    validationMessages.push("BoxID is required.");
  }

  if (req.body.SensorID === Object) {
    validationMessages.push("SensorID is required.");
  }

  if (req.body.Value === Object) {
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

    if (validationMessages.length != 0) {
      return res.status(400).send({ messages: validationMessages });
    }

    // BOX

    let box = await Box.findByPk(req.body.BoxID);
    if (box == null) {
      return res.status(400).send({ message: "BoxID not found" });
    }

    // SensorID
    let sensor = await Sensor.findByPk(req.body.SensorID);
    if (sensor == null) {
      return res.status(400).send({ message: "Sensor not found" });
    }

    //create
    Measurement.create({
      BoxID: box.BoxID,
      SensorID: sensor.SensorID,
      Sensor: sensor,
      Box: box,
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

  //Extra Grafiek
  async getAllGraphics(req, res) {
    //check value exist
    let validationMessages = [];
    if (req.body.UserID === Object) {
      validationMessages.push("UserID is required.");
    }

    if (req.body.SensorTypeName === Object) {
      validationMessages.push("SensorTypeName is required.");
    }

    if (validationMessages.length != 0) {
      return res.status(400).send({ messages: validationMessages });
    }

    let user;
    let measurement;

    //get boxen and sensors
    let boxesID = [];
    let boxes = [];
    let sensors = [];

    try {
      // check if admin of monteur
      user = await User.findByPk(req.body.UserID, {
        include: [
          {
            paranoid: true,
            model: UserType,
            as: "UserType",
          },
        ],
      });
      // if admin of monteur
      if (
        user.UserType.UserTypeName == "Admin" ||
        user.UserType.UserTypeName == "Monteur"
      ) {
        box = await Box.findByPk(req.body.BoxID, {
          include: [
            {
              paranoid: true,
              model: Sensor,
              as: "sensors",
              include: [
                {
                  paranoid: true,
                  model: SensorType,
                  as: "SensorType",
                  where: { Name: req.body.SensorTypeName },
                },
              ],
            },
          ],
        });

        //get boxen
        boxesID.push(box.BoxID);
        boxes.push(box);
        box.sensors.forEach((sensor) => {
          sensors.push(sensor.SensorID);
        });
      } else {
        // get all Sensortypes with different boxes

        //check if boxId exist
        if (req.body.BoxID) {
          user = await User.findByPk(req.body.UserID, {
            include: [
              {
                paranoid: true,
                model: Box,
                as: "boxes",
                where: { BoxID: req.body.BoxID },
                include: [
                  {
                    paranoid: true,
                    model: Sensor,
                    as: "sensors",
                    include: [
                      {
                        paranoid: true,
                        model: SensorType,
                        as: "SensorType",
                        where: { Name: req.body.SensorTypeName },
                      },
                    ],
                  },
                ],
              },
            ],
          });
        } else {
          user = await User.findByPk(req.body.UserID, {
            include: [
              {
                paranoid: true,
                model: Box,
                as: "boxes",
                include: [
                  {
                    paranoid: true,
                    model: Sensor,
                    as: "sensors",
                    include: [
                      {
                        paranoid: true,
                        model: SensorType,
                        as: "SensorType",
                        where: { Name: req.body.SensorTypeName },
                      },
                    ],
                  },
                ],
              },
            ],
          });
        }

        user.boxes.forEach((box) => {
          //add box id
          boxesID.push(box.BoxID);
          boxes.push(box);

          box.sensors.forEach((sensor) => {
            sensors.push(sensor.SensorID);
          });
        });
      }

      if (req.body.StartDate && req.body.EndDate) {
        console.log("ok", boxesID, sensors);
        measurement = await Measurement.findAll({
          where: {
            BoxID: boxesID,
            SensorID: sensors,
            TimeStamp: {
              [Op.between]: [
                new Date(req.body.StartDate),
                new Date(req.body.EndDate),
              ],
            },
          },
          order: [["TimeStamp", "DESC"]],
        });
      } else {
        //Zonder datum
        measurement = await Measurement.findAll({
          where: { BoxID: boxesID, SensorID: sensors },
          order: [["TimeStamp", "DESC"]],
          limit: 20,
        });
      }

      //sort from timestamp small to big
      measurement = measurement.sort((a, b) => a.TimeStamp - b.TimeStamp);

      return res.status(200).send({ Measurements: measurement, Boxes: boxes });
    } catch (e) {
      return res.status(400).send(e);
    }
  },
};
