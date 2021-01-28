const UserType = require("../models").UserType;

//Validation UserType
userTypevalidate = (req, res) => {
  let validationMessages = [];

  if (!req.body.UserTypeName) {
    validationMessages.push("UserTypeName is required.");
  }

  return validationMessages;
};

//Check if exist
async function userTypeExist(val) {
  return await UserType.findOne({
    where: { UserTypeName: val },
  });
}

//Models
module.exports = {
  list(req, res) {
    UserType.findAll()
      .then((userTypes) => res.status(200).send(userTypes))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    UserType.findByPk(req.params.id)
      .then((val) => {
        if (!val) {
          return res.status(404).send({
            message: "UserType Not Found",
          });
        }
        return res.status(200).send(val);
      })
      .catch((error) => res.status(400).send(error));
  },

  getByName(req, res) {
    UserType.findByUserTypeName(req.params.name)
      .then((val) => {
        if (!val) {
          return res.status(404).send({
            message: "UserType Not Found",
          });
        }
        return res.status(200).send(val);
      })
      .catch((error) => res.status(400).send(error));
  },

  async add(req, res) {
    //validation
    let validationMessages = userTypevalidate(req, res);

    if (validationMessages.length != 0) {
      return res.status(400).send({ messages: validationMessages });
    }

    //already exist
    if ((await userTypeExist(req.body.UserTypeName)) != null) {
      return res.status(400).send({ message: "UserTypeName already exist!" });
    }

    //create
    UserType.create({
      UserTypeName: req.body.UserTypeName,
    })
      .then((userType) => res.status(201).send(userType))
      .catch((error) => res.status(400).send(error));
  },
};
