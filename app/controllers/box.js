const Box = require("../models").Box;
const Sensor = require("../models").Sensor;
const SensorType = require("../models").SensorType;

//Validation Box
boxValidate = (req, res) => {
  let validationMessages = [];

  if (!req.body.MacAddress) {
    validationMessages.push("MacAddress is required.");
  }

  if (!req.body.Name) {
    validationMessages.push("Name is required.");
  }

  // if (!req.body.Comment) {
  //   validationMessages.push("Comment is required.");
  // }

  return validationMessages;
};

//Check if exist
async function boxExist(val) {
  return await Box.findOne({
    where: { MacAddress: val },
  });
}

//Models
module.exports = {
  list(req, res) {
    Box.findAll()
      .then((box) => res.status(200).send(box))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    Box.findByPk(req.params.id)
      .then((val) => {
        if (!val) {
          return res.status(404).send({
            message: "Box Not Found",
          });
        }
        return res.status(200).send(val);
      })
      .catch((error) => res.status(400).send(error));
  },

  getByIdAll(req, res) {
    Box.findByPk(req.params.id, {
      include: [{ all: true }],
    })
      .then((val) => {
        if (!val) {
          return res.status(404).send({
            message: "Box Not Found",
          });
        }
        return res.status(200).send(val);
      })
      .catch((error) => res.status(400).send(error));
  },

  getByMacAdress(req, res) {
    Box.findOne({
      where: { MacAddress: req.body.MacAddress },
    })
      .then((val) => {
        if (!val) {
          return res.status(404).send({
            message: "Box Not Found",
          });
        }
        return res.status(200).send(val);
      })
      .catch((error) => res.status(400).send(error));
  },

  //Create box functie
  async add(req, res) {
    //validation
    let validationMessages = boxValidate(req, res);

    if (validationMessages.length != 0) {
      return res.status(400).send({ messages: validationMessages });
    }

    //already exist
    if ((await boxExist(req.body.MacAddress)) != null) {
      return res
        .status(400)
        .send({ message: "Box with this mac address already exists!" });
    }

    //create
    Box.create({
      MacAddress: req.body.MacAddress,
      Name: req.body.Name,
      Comment: req.body.Comment,
      Active: req.body.Active,
    })
      .then((val) => res.status(201).send(val))
      .catch((error) => res.status(400).send(error));
  },

  async update(req, res) {
    //validation
    let validationMessages = this.boxValidate(req, res);

    if (validationMessages.length != 0) {
      return res.status(400).send({ messages: validationMessages });
    }

    //find
    let box = await Box.findByPk(req.body.BoxID);
    if (box == null) {
      return res.status(400).send({ message: "Box not found" });
    }

    //update box
    box
      .update(req.body)
      .then((val) => res.status(200).send(val))
      .catch((error) => res.status(400).send(error));
  },

  //Delete Box Functie
  delete(req, res) {
    Box.findByPk(req.params.id)
      .then((val) => {
        if (!val) {
          return res.status(400).send({
            message: "Box Not Found",
          });
        }
        return val
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  //MANY MANY
  async addSensor(req, res) {
    try {
      var box = await Box.findByPk(req.body.BoxID);
      if (!box) {
        return res.status(404).send({
          message: "box Not Found",
        });
      }

      var sensor = await Sensor.findByPk(req.body.SensorID);
      if (!sensor) {
        return res.status(404).send({
          message: "Sensor Not Found",
        });
      }
      var t = await box.addSensor(sensor);

      var box = await Box.findByPk(req.body.BoxID, {
        include: [
          {
            paranoid: true,
            model: Sensor,
            as: "sensors",
          },
        ],
      });

      return res.status(200).send(box);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async addSensorArduino(req, res) {
    try {
      //get box
      var box = await Box.findByPk(req.body.BoxID);
      if (!box) {
        return res.status(404).send({
          message: "box Not Found",
        });
      }

      //check if sensor exist
      var sensor = await Sensor.findOne({
        where: { Name: req.body.SensorName },
      });

      //if sensor didn't exist
      if (!sensor) {
        //get sensortype
        var sensorType = await SensorType.findOne({
          where: { Name: req.body.SensorTypeName },
        });
        if (!sensorType) {
          return res.status(404).send({
            message: "SensorType Not Found",
          });
        }

        //create sensor
        var sensor = await Sensor.create({
          Name: req.body.SensorName,
          SensorTypeID: sensorType.SensorTypeID,
        });
      }

      var t = await box.addSensor(sensor);

      // var box = await Box.findByPk(req.body.BoxID, {
      //   include: [
      //     {
      //       paranoid: true,
      //       model: Sensor,
      //       as: "sensors",
      //     },
      //   ],
      // });

      return res.status(200).send(sensor);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
