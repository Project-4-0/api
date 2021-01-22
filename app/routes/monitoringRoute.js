//express framework
const express = require("express");
const router = express.Router();
router.use(express.json());

router.use(express.json());

//Controller import
const monitoringController = require('../controllers/monitoringController');

//Functions
router.get("/", monitoringController.monitoring_indexs);
router.get("/:id", monitoringController.monitoring_index);
router.post("/", monitoringController.monitoring_create);
router.put("/:id", monitoringController.monitoring_update);
router.delete("/:id", monitoringController.monitoring_delete);

//Export route
module.exports = router;
  