const jwt = require("jsonwebtoken");
const User = require("../models").User;
const UserType = require("../models").UserType;

//make token
isTokenPresent = (req) => {
  return req.headers["authorization"] !== undefined;
};

extractToken = (req) => {
  return req.headers["authorization"].split("Bearer ")[1];
};

//verify
verifyToken = (req, res, next) => {
  if (!isTokenPresent(req)) {
    return res.status(403).send({ message: "No token provided!" });
  }

  let token = extractToken(req);

  jwt.verify(token, "vito-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.UserID = decoded.id;
    next();
  });
};

//is ADMIN
hasPermisionAdmin = (req, res, next) => {
  if (!isTokenPresent(req)) {
    return res.status(403).send({ message: "No token provided!" });
  }

  let token = extractToken(req);

  jwt.verify(token, "vito-secret-key", (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Unauthorized." });
    }
    User.findByPk(decoded.UserID, {
      include: [
        {
          model: UserType,
          as: "UserType",
        },
      ],
    }).then((user) => {
      console.log(user);
      if (user.UserType.UserTypeName == "Admin") {
        next();
      } else {
        return res.status(403).send({ message: "Route requires privileges" });
      }
    });
  });
};
//Is Monteur
hasPermisionMonteur = (req, res, next) => {
  if (!isTokenPresent(req)) {
    return res.status(403).send({ message: "No token provided!" });
  }

  let token = extractToken(req);

  jwt.verify(token, "vito-secret-key", (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Unauthorized." });
    }
    User.findByPk(decoded.UserID, {
      include: [
        {
          model: UserType,
          as: "UserType",
        },
      ],
    }).then((user) => {
      console.log(user);
      if (user.UserType.UserTypeName == "Monteur") {
        next();
      } else {
        return res.status(403).send({ message: "Route requires privileges" });
      }
    });
  });
};

const authJwt = {
  verifyToken,
  hasPermisionAdmin,
  hasPermisionMonteur,
};
module.exports = authJwt;
