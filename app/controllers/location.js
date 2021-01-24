const Location = require("../models").Location;

//Validation Location
locationValidate = (req, res) => {
  let validationMessages = [];

  if (!req.body.BoxUserID) {
    validationMessages.push("BoxUserID is required.");
  }

  if (!req.body.Latitude) {
    validationMessages.push("Latitude is required.");
  }

  if (!req.body.Longitude) {
    validationMessages.push("Longitude is required.");
  }

  return validationMessages;
};

//Check if exist
async function locationExist(val) {
  return await Location.findOne({
    where: { Name: val },
  });
}

//Models
module.exports = {
  list(req, res) {
    Location.findAll()
      .then((location) => res.status(200).send(location))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    Location.findByPk(req.params.id)
      .then((val) => {
        if (!val) {
          return res.status(404).send({
            message: "Location Not Found",
          });
        }
        return res.status(200).send(val);
      })
      .catch((error) => res.status(400).send(error));
  },

  async add(req, res) {
    //validation
    let validationMessages = locationValidate(req, res);

    if (validationMessages.length != 0) {
      return res.status(400).send({ messages: validationMessages });
    }

    //create
    Location.create({
      BoxUserID: req.body.BoxUserID,
      Latitude: req.body.Latitude,
      Longitude: req.body.Longitude,
      StartDate: new Date().toISOString(),
    })
      .then((location) => res.status(201).send(location))
      .catch((error) => res.status(400).send(error));
  },

  async update(req, res) {
    //validation
    let validationMessages = locationValidate(req, res);

    if (validationMessages.length != 0) {
      return res.status(400).send({ messages: validationMessages });
    }

    //find
    let location = await Location.findByPk(req.body.LocationID);
    if (location == null) {
      return res.status(400).send({ message: "LocationID not found" });
    }

    //update location
    location
      .update(req.body)
      .then((val) => res.status(200).send(val))
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    Location.findByPk(req.params.id)
      .then((val) => {
        if (!val) {
          return res.status(400).send({
            message: "LocationID Not Found",
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
