var express = require("express");
var router = express.Router();

/*Controllers*/
const userTypeController = require("../controllers").userType;
const userController = require("../controllers").user;

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

/* users Router */
router.get("/users", userController.list);
router.get("/users/:id", userController.getById);
router.post("/users", userController.add);
router.put("/users", userController.update);
router.delete("/users/:id", userController.delete);

module.exports = router;
