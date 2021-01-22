//express framework
const express = require("express");
const router = express.Router();
router.use(express.json());

router.use(express.json());

//Controller import
const locationController = require('../controllers/locationController');

//Functions
router.get("/", locationController.location_indexs);
router.get("/:id", locationController.location_index);
router.post("/", locationController.location_create);
router.put("/:id", locationController.location_update);
router.delete("/:id", locationController.location_delete);

//Export route
module.exports = router;
  