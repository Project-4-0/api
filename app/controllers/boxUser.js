const BoxUser = require("../models").BoxUser;
const User = require("../models").User;
const Location = require("../models").Location;
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
async function boxUserExist(val) {
  return await BoxUser.findOne({
    where: { BoxID: val },
  });
}

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
        {
          model: Location,
          as: "Location",
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
    let validationMessages = BoxUserValidate(req, res);

    if (validationMessages.length != 0) {
      return res.status(400).send({ messages: validationMessages });
    }

    //create
    BoxUser.create({
      BoxID: req.body.BoxID,
      UserID: req.body.UserID,
      StartDate: req.body.StartDate,
      EndDate: req.body.EndDate,
    })
      .then((val) => res.status(201).send(val))
      .catch((error) => res.status(400).send(error));
  },

  //Update BoxUser functie
  async update(req, res) {
    //validation
    let validationMessages = userBoxValidate(req, res);

    if (validationMessages.length != 0) {
      return res.status(400).send({ messages: validationMessages });
    }

    //find
    let userBox = await UserBox.findByPk(req.body.UserBoxID);
    if (userBox == null) {
      return res.status(400).send({ message: "UserBoxID not found" });
    }

    //update sensor
    userBox
      .update(req.body)
      .then((val) => res.status(200).send(val))
      .catch((error) => res.status(400).send(error));
  },

  //Delete BoxUser functie
  delete(req, res) {
    UserBox.findByPk(req.params.id)
      .then((val) => {
        if (!val) {
          return res.status(400).send({
            message: "UserBox Not Found",
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