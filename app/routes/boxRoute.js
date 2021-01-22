//express framework
const express = require("express");
const router = express.Router();

router.use(express.json());

//Controller import
const boxController = require('../controllers/boxController');

//Functions
router.get("/", boxController.box_indexs);
router.get("/:id", boxController.box_index);
router.post("/", boxController.box_create);
router.put("/:id", boxController.box_update);
router.delete("/:id", boxController.box_delete);

//Export route
module.exports = router;