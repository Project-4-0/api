var express = require("express");
var router = express.Router();

//authjwt token
const { authJwt } = require("../middlewares");

/*Controllers*/
const userTypeController = require("../controllers").userType;
const userController = require("../controllers").user;
const sensorTypeController = require("../controllers").sensorType;
const sensorController = require("../controllers").sensor;
const locatoinController = require("../controllers").location;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* UserType Router */
router.get("/userTypes", userTypeController.list);
router.get("/userTypes/:id", userTypeController.getById);
router.post("/userTypes", userTypeController.add);
// router.put("userTypes/:id", userTypeController.update);
// router.delete("userTypes/:id", userTypeController.delete);

/* SensorType Router */
router.get("/sensorTypes", sensorTypeController.list);
router.get("/sensorTypes/:id", sensorTypeController.getById);
router.post("/sensorTypes", sensorTypeController.add);
// router.put("userTypes/:id", userTypeController.update);
// router.delete("userTypes/:id", userTypeController.delete);

/* Sensor Router */
router.get("/sensor", sensorController.list);
router.get("/sensor/:id", sensorController.getById);
router.post("/sensor", sensorController.add);
router.put("/sensor", sensorController.update);
router.delete("/sensor/:id", sensorController.delete);

/* Locations Router */
router.get("/locations", locatoinController.list);
router.get("/locations/:id", locatoinController.getById);
router.post("/locations", locatoinController.add);
router.put("/locations", locatoinController.update);
router.delete("/locations/:id", locatoinController.delete);

/* users Router */
router.get(
  "/users",
  [authJwt.verifyToken, authJwt.hasPermisionAdmin],
  userController.list
);
router.get("/users/:id", [authJwt.verifyToken], userController.getById);
router.post("/users", userController.add);
router.put("/users", userController.update);
router.delete("/users/:id", userController.delete);
//LOGIN
router.post("/login", userController.login);

module.exports = router;
