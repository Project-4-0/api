//express framework
const express = require("express");
const router = express.Router();

router.use(express.json());

//Controller import
const boxuserController = require('../controllers/boxuserController');

//Functions
router.get("/", boxuserController.boxuser_indexs);
router.get("/:id", boxuserController.boxuser_index);
router.post("/", boxuserController.boxuser_create);
router.put("/:id", boxuserController.boxuser_update);
router.delete("/:id", boxuserController.boxuser_delete);

//Export route
module.exports = router;