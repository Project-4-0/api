const Box = require("../models").Box;

//Validation Box
boxValidate = (req, res) => {
  let validationMessages = [];

  if (!req.body.MacAdress) {
    validationMessages.push("MacAdress is required.");
  }

  if (!req.body.Name) {
    validationMessages.push("Name is required.");
  }

  if (!req.body.Active) {
    validationMessages.push("Active is required.");
  }

  return validationMessages;
};

//Check if exist
async function boxExist(val) {
  return await Box.findOne({
    where: { MacAdress: val },
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


  //Create box functie
  async add(req, res) {
    //validation
    let validationMessages = boxValidate(req, res);

    if (validationMessages.length != 0) {
      return res.status(400).send({ messages: validationMessages });
    }

    //already exist
    if ((await boxExist(req.body.MacAdress)) != null) {
      return res.status(400).send({ message: "Box already exists!" });
    }

    //create
    SensorType.create({
      MacAdress: req.body.MacAdress,
      Name: req.body.Name,
      Comment: req.body.Comment,
      ConfiguratieString: req.body.ConfiguratieString,
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

    //update user
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

};
