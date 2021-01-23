const SensorType = require("../models").SensorType;

//Validation SensorType
sensorTypevalidate = (req, res) => {
  let validationMessages = [];

  if (!req.body.Name) {
    validationMessages.push("Name is required.");
  }

  if (!req.body.Unit) {
    validationMessages.push("Unite is required.");
  }

  return validationMessages;
};

//Check if exist
async function sensorTypeExist(val) {
  return await SensorType.findOne({
    where: { Name: val },
  });
}

//Models
module.exports = {
  list(req, res) {
    SensorType.findAll()
      .then((sensorType) => res.status(200).send(sensorType))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    SensorType.findByPk(req.params.id)
      .then((val) => {
        if (!val) {
          return res.status(404).send({
            message: "SensorType Not Found",
          });
        }
        return res.status(200).send(val);
      })
      .catch((error) => res.status(400).send(error));
  },

  async add(req, res) {
    //validation
    let validationMessages = sensorTypevalidate(req, res);

    if (validationMessages.length != 0) {
      return res.status(400).send({ messages: validationMessages });
    }

    //already exist
    if ((await sensorTypeExist(req.body.Name)) != null) {
      return res.status(400).send({ message: "Name already exist!" });
    }

    //create
    SensorType.create({
      Name: req.body.Name,
      Unit: req.body.Unit,
    })
      .then((userType) => res.status(201).send(userType))
      .catch((error) => res.status(400).send(error));
  },
};
