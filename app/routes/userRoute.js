//express framework
const express = require("express");
const router = express.Router();

router.use(express.json());

//Controller import
const userController = require('../controllers/userController');

//Functions
router.get("/", userController.user_indexs);
router.get("/:id", userController.user_index);
router.post("/", userController.user_create);
router.put("/:id", userController.user_update);
router.delete("/:id", userController.user_delete);

//Export route
module.exports = router;