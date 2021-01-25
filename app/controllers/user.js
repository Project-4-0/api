const User = require("../models").User;
const UserType = require("../models").UserType;

//library
var jwt = require("jsonwebtoken");
// var bcrypt = require("bcryptjs");

//Validation User
userValidate = (req, res) => {
  let validationMessages = [];

  if (!req.body.FirstName) {
    validationMessages.push("FirstName is required.");
  }

  if (!req.body.LastName) {
    validationMessages.push("LastName is required.");
  }

  //   if (!req.body.Password) {
  //     validationMessages.push("Password is required.");
  //   }

  if (!req.body.Email) {
    validationMessages.push("Email is required.");
  }

  if (!req.body.Address) {
    validationMessages.push("Address is required.");
  }

  if (!req.body.PostalCode) {
    validationMessages.push("PostalCode is required.");
  }

  if (!req.body.City) {
    validationMessages.push("City is required.");
  }

  if (!req.body.UserTypeID) {
    validationMessages.push("UserTypeID is required.");
  }

  return validationMessages;
};

//Check if exist
async function userExist(val) {
  return await User.findOne({
    where: { Email: val },
  });
}

//Models
module.exports = {
  list(req, res) {
    User.findAll()
      .then((user) => res.status(200).send(user))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    User.findByPk(req.params.id, {
      include: [
        {
          model: UserType,
          as: "UserType",
        },
      ],
    })
      .then((val) => {
        if (!val) {
          return res.status(404).send({
            message: "User Not Found",
          });
        }
        return res.status(200).send(val);
      })
      .catch((error) => res.status(400).send(error));
  },

  async add(req, res) {
    //validation
    let validationMessages = this.userValidate(req, res);

    if (validationMessages.length != 0) {
      return res.status(400).send({ messages: validationMessages });
    }

    //already exist
    if ((await userExist(req.body.Email)) != null) {
      return res.status(400).send({ message: "Email already exist!" });
    }

    //TODO PASSWORD DESCREPT

    //create
    User.create({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Password: req.body.Password,
      Email: req.body.Email,
      Address: req.body.Address,
      PostalCode: req.body.PostalCode,
      City: req.body.City,
      UserTypeID: req.body.UserTypeID,
    })
      .then((val) => res.status(201).send(val))
      .catch((error) => res.status(400).send(error));
  },

  async update(req, res) {
    //validation
    let validationMessages = this.userValidate(req, res);

    if (validationMessages.length != 0) {
      return res.status(400).send({ messages: validationMessages });
    }

    //find
    let user = await User.findByPk(req.body.UserID);
    if (user == null) {
      return res.status(400).send({ message: "UserID not found" });
    }

    //update user
    user
      .update(req.body)
      .then((val) => res.status(200).send(val))
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    User.findByPk(req.params.id)
      .then((val) => {
        if (!val) {
          return res.status(400).send({
            message: "UserID Not Found",
          });
        }
        return val
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  //EXTRA
  async login(req, res) {
    var user = await User.findOne({ where: { Email: req.body.Email } });
    if (!user) {
      return res.status(400).send({ message: "Email not found" });
    }

    //TODO PASSWORD DESCREPT
    if (req.body.Password == user.Password) {
      passwordIsValid = true;
    }

    if (!passwordIsValid) {
      return res.status(400).send({
        user: null,
        message: "Invalid Password!",
      });
    }

    var token = jwt.sign(
      {
        UserID: user.UserID,
        FirstName: user.FirstName,
        LastName: user.LastName,
        UserType: user.UserType,
      },
      "vito-secret-key",
      {
        expiresIn: 86400, // 24 hours
      }
    );

    res.status(200).send({
      UserID: user.UserID,
      Token: token,
    });
  },
};
