const User = require("../models").User;
const UserType = require("../models").UserType;
const Box = require("../models").Box;
const BoxUser = require("../models").BoxUser;
const Location = require("../models").Location;
const SensorType = require("../models").SensorType;

//library
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

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

    //already exist
    if ((await SensorType.findByPk(req.body.UserTypeID)) == null) {
      return res.status(400).send({ message: "SensorType didn't exist!" });
    }

    console.log(bcrypt.hashSync(req.body.Password, 8));

    // create
    User.create({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Password: bcrypt.hashSync(req.body.Password, 8),
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
      .update({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Password: bcrypt.hashSync(req.body.Password, 8),
        Email: req.body.Email,
        Address: req.body.Address,
        PostalCode: req.body.PostalCode,
        City: req.body.City,
        UserTypeID: req.body.UserTypeID,
      })
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

  //MANY MANY
  async addBox(req, res) {
    //check Validation
    let validationMessages = [];

    if (!req.body.UserID) {
      validationMessages.push("UserID is required.");
    }

    if (!req.body.BoxID) {
      validationMessages.push("BoxID is required.");
    }

    if (!req.body.Latitude) {
      validationMessages.push("Latitude is required.");
    }
    if (!req.body.Longitude) {
      validationMessages.push("Longitude is required.");
    }

    if (validationMessages.length != 0) {
      return res.status(400).send({ messages: validationMessages });
    }

    //Get db call
    try {
      //user
      var user = await User.findByPk(req.body.UserID);
      if (!user) {
        return res.status(404).send({
          message: "User Not Found",
        });
      }

      //box
      var box = await Box.findByPk(req.body.BoxID);
      if (!box) {
        return res.status(404).send({
          message: "box Not Found",
        });
      }

      //add box
      var s = await user.addBox(box);

      var user = await User.findByPk(req.body.UserID, {
        include: [
          {
            paranoid: true,
            model: Box,
            as: "boxes",
          },
        ],
      });

      //get userBox oldlocation
      let oldlocation = await Location.findOne({
        // include: [{ all: true, paranoid: true }],
        where: { EndDate: null },
        order: [["LocationID", "DESC"]],
        // include: [
        //   {
        //     all: true,
        //     paranoid: true,
        //     where: { BoxID: box.BoxID, UserID: user.UserID, EndDate: null },
        //   },
        // ],
      });

      if (oldlocation) {
        //set endate location
        oldlocation = await oldlocation.update({
          EndDate: new Date().toISOString(),
        });
      }

      //get boxUserID
      var userBox = await User.findByPk(req.body.UserID, {
        include: [
          {
            paranoid: true,
            model: Box,
            as: "boxes",
            where: { BoxID: box.BoxID },
          },
        ],
      });

      let boxUser = userBox.boxes[0].BoxUser;
      let bo = await boxUser.update({
        EndDate: null,
      });

      // new location();
      let location = await Location.create({
        BoxUserID: boxUser.BoxUserID,
        Latitude: req.body.Latitude,
        Longitude: req.body.Longitude,
        StartDate: new Date().toISOString(),
      });

      return res.status(200).send({ message: "Gekoppeld" });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async deleteBox(req, res) {
    //check Validation
    let validationMessages = [];

    if (!req.body.UserID) {
      validationMessages.push("UserID is required.");
    }

    if (!req.body.BoxID) {
      validationMessages.push("BoxID is required.");
    }

    if (validationMessages.length != 0) {
      return res.status(400).send({ messages: validationMessages });
    }

    //Get db call
    try {
      //user
      var user = await User.findByPk(req.body.UserID);
      if (!user) {
        return res.status(404).send({
          message: "User Not Found",
        });
      }

      //box
      var box = await Box.findByPk(req.body.BoxID);
      if (!box) {
        return res.status(404).send({
          message: "box Not Found",
        });
      }

      //get boxUserID
      var userBox = await User.findByPk(req.body.UserID, {
        include: [
          {
            paranoid: true,
            model: Box,
            as: "boxes",
            where: { BoxID: box.BoxID },
          },
        ],
      });

      let boxUser = userBox.boxes[0].BoxUser;

      let w = await boxUser.update({
        EndDate: new Date().toISOString(),
      });

      return res.status(200).send({ message: "Ontkoppeld" });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async with_boxes(req, res) {
    let user;
    // get user
    try {
      user = await User.findByPk(req.params.id, {
        include: [
          {
            model: UserType,
            as: "UserType",
          },
          {
            model: Box,
            as: "boxes",
            through: { where: { EndDate: null } },
          },
        ],
      });

      //check if user exist
      if (!user) {
        return res.status(404).send({
          message: "User Not Found",
        });
      }
      return res.status(200).send({ user: user });
    } catch (e) {
      return res.status(400).send(e);
    }
  },

  //EXTRA
  async login(req, res) {
    var user = await User.findOne({ where: { Email: req.body.Email } });
    if (!user) {
      return res.status(400).send({ message: "Email not found" });
    }

    passwordIsValid = false;
    var passwordIsValid = bcrypt.compareSync(req.body.Password, user.Password);

    // if (req.body.Password === user.Password) {
    //   passwordIsValid = true;
    // }

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
