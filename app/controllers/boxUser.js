const BoxUser = require("../models").BoxUser;
const User = require("../models").User;
const Box = require("../models").Box;

//Validation BoxUser
boxUserValidate = (req, res) => {
  let validationMessages = [];

  if (!req.body.BoxID) {
    validationMessages.push("BoxID is required.");
  }

  if (!req.body.UserID) {
    validationMessages.push("UserID is required.");
  }

  if (!req.body.StartDate) {
    validationMessages.push("StartDate is required.");
  }

  if (!req.body.EndDate) {
    validationMessages.push("EndDate is required.");
  }

  return validationMessages;
};

//Check if exist


//Models
module.exports = {
  list(req, res) {
    BoxUser.findAll()
      .then((boxUser) => res.status(200).send(boxUser))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    BoxUser.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "User",
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
            message: "BoxUser Not Found",
          });
        }
        return res.status(200).send(val);
      })
      .catch((error) => res.status(400).send(error));
  },

  //Create BoxUser functie
  async add(req, res) {
    //validation
    let validationMessages = boxUserValidate(req, res);

    if (validationMessages.length != 0) {
      return res.status(400).send({ messages: validationMessages });
    }

    //create
    BoxUser.create({
      BoxID: req.body.BoxID,
      UserID: req.body.UserID,
      StartDate: new Date().toISOString(),
      EndDate: req.body.EndDate,
    })
      .then((val) => res.status(201).send(val))
      .catch((error) => res.status(400).send(error));
  },

  //Update BoxUser functie
  async update(req, res) {
    //validation
    let validationMessages = this.boxUserValidate(req, res);

    if (validationMessages.length != 0) {
      return res.status(400).send({ messages: validationMessages });
    }

    //find
    let boxUser = await BoxUser.findByPk(req.body.BoxUserID);
    if (boxUser == null) {
      return res.status(400).send({ message: "BoxUserID not found" });
    }

    //update BoxUser
    boxUser
      .update(req.body)
      .then((val) => res.status(200).send(val))
      .catch((error) => res.status(400).send(error));
  },

  //Delete BoxUser functie
  delete(req, res) {
    BoxUser.findByPk(req.params.id)
      .then((val) => {
        if (!val) {
          return res.status(400).send({
            message: "BoxUser Not Found",
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