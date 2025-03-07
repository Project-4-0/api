var express = require("express");
var router = express.Router();

//authjwt token
const { authJwt } = require("../middlewares");

/*Controllers*/

const boxController = require("../controllers").box;
const boxUserController = require("../controllers").boxUser;
const userTypeController = require("../controllers").userType;
const userController = require("../controllers").user;
const sensorTypeController = require("../controllers").sensorType;
const sensorController = require("../controllers").sensor;
const locationController = require("../controllers").location;
const measurementController = require("../controllers").measurement;
const monitoringController = require("../controllers").monitoring;
const terrascopeController = require("../controllers").terrascope;
const predictController = require("../controllers").predict;
const kpisController = require("../controllers").kpis;
const weatherController = require("../controllers").weather;

const testController = require("../controllers").test;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* TO DO Box Router */
router.get("/boxes", boxController.list);
router.get("/boxes/:id", boxController.getById);
router.post("/boxes", boxController.add);
router.put("/boxes", boxController.update);
router.delete("/boxes/:id", boxController.delete);

//arduino
router.post("/boxes/add_sensor_arduino", boxController.addSensorArduino);

router.post("/boxes/add_sensor", boxController.addSensor);
router.get("/boxes/:id/all", boxController.getByIdAll);

router.post("/boxes/macAddress", boxController.getByMacAdress);

/* TO DO Measurement Router */
router.get("/measurements", measurementController.list);
router.get("/measurements/:id", measurementController.getById);
router.post("/measurements", measurementController.add);
// router.put("/measurements", measurementController.update);
// router.delete("measurements/:id", measurementController.delete);

router.post("/measurements/graphics", measurementController.getAllGraphics);

/* Locations Router */
router.get("/locations", locationController.list);
router.get("/locations/:id", locationController.getById);
router.post("/locations", locationController.add);
router.put("/locations", locationController.update);
router.delete("/locations/:id", locationController.delete);

router.get("/locations/box/:id", locationController.getByBox);


/* BoxUser Router */
// router.get("/boxUsers", boxUserController.list);
// router.get("/boxUsers/:id", boxUserController.getById);
// router.post("/boxUsers", boxUserController.add);
// router.put("/boxUsers", boxUserController.update);
// router.delete("/boxUsers/:id", boxUserController.delete);

/* Monitoring Router */
router.get("/monitoring", monitoringController.list);
router.get("/monitoring/:id", monitoringController.getById);
router.post("/monitoring", monitoringController.add);

/* UserType Router Works*/
router.get("/userTypes", userTypeController.list);
router.get("/userTypes/:id", userTypeController.getById);
router.post("/userTypes", userTypeController.add);
// router.put("userTypes/:id", userTypeController.update);
// router.delete("userTypes/:id", userTypeController.delete);

router.post("/userTypes/name", userTypeController.getByName);

/* SensorType Router WORKS */
router.get("/sensorTypes", sensorTypeController.list);
router.get("/sensorTypes/:id", sensorTypeController.getById);
router.post("/sensorTypes", sensorTypeController.add);
// router.put("userTypes/:id", userTypeController.update);
// router.delete("userTypes/:id", userTypeController.delete);

/* Sensor Router WORKS*/
router.get("/sensors", sensorController.list);
router.get("/sensors/:id", sensorController.getById);
router.post("/sensors", sensorController.add);
router.put("/sensors", sensorController.update);
router.delete("/sensors/:id", sensorController.delete);

/* users Router WORKS*/
router.get(
  "/users",
  // [authJwt.verifyToken, authJwt.hasPermisionAdmin],
  userController.list
);
router.get("/users/:id", userController.getById);
router.post("/users", userController.add);
router.put("/users", userController.update);
router.delete("/users/:id", userController.delete);

//Extra
router.post("/users/add_box", userController.addBox);
router.post("/users/delete_box", userController.deleteBox);
router.get("/users/:id/with_boxes", userController.with_boxes);

//LOGIN
router.post("/login", userController.login);

/*terrascope */
router.get("/terrascope/box/:id", terrascopeController.getUrlByBoxID);

/*Predict */
router.post("/predict", predictController.getInputData);
router.get("/predict/box/:id", predictController.getOutputData);

/*KPIS*/
router.get("/kpi/adminDashboard", kpisController.getAdminDashboardKPI);

/*Weather*/
router.get("/weather/box/:id", weatherController.getWeather);

//TEST MICRO
router.get("/test", testController.list);
router.post("/test", testController.add);

module.exports = router;
