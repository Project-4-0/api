const Measurement = require("../models").Measurement;

//Validation Measurement
measurementValidate = (req, res) => {
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
async function measurementExist(val) {
  return await Measurement.findOne({
    where: { Name: val },
  });
}

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
    Measurement.findByPk(req.params.id)
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

  async add(req, res) {
    //validation
    let validationMessages = measurementValidate(req, res);

    if (validationMessages.length != 0) {
      return res.status(400).send({ messages: validationMessages });
    }

    //if exist

    
    //TODO BOX

    //TODO SensorID

    //create
    Measurement.create({
      BoxID: req.body.BoxID,
      SensorID: req.body.SensorID,
      Value: req.body.Value,
      TimeStamp: req.body.TimeStamp,
    })
      .then((userType) => res.status(201).send(userType))
      .catch((error) => res.status(400).send(error));
  },
};
