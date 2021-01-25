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
const measurementController = require("../controllers").measurement;

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
router.get("/sensors", sensorController.list);
router.get("/sensors/:id", sensorController.getById);
router.post("/sensors", sensorController.add);
router.put("/sensors", sensorController.update);
router.delete("/sensors/:id", sensorController.delete);

/* Locations Router */
router.get("/locations", locatoinController.list);
router.get("/locations/:id", locatoinController.getById);
router.post("/locations", locatoinController.add);
router.put("/locations", locatoinController.update);
router.delete("/locations/:id", locatoinController.delete);

/* Measurements Router */
router.get("/measurements", measurementController.list);
router.get("/measurements/:id", measurementController.getById);
router.post("/measurements", measurementController.add);
// router.put("/measurements", measurementController.update);
// router.delete("/measurements/:id", measurementController.delete);

/* users Router */
router.get(
  "/users",
  [authJwt.verifyToken, authJwt.hasPermisionAdmin],
  userController.list
);
router.get("/users/:id", userController.getById);
router.post("/users", userController.add);
router.put("/users", userController.update);
router.delete("/users/:id", [authJwt.verifyToken], userController.delete);
//LOGIN
router.post("/login", userController.login);

module.exports = router;
