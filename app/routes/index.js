var express = require("express");
var router = express.Router();

//authjwt token
const { authJwt } = require("../middlewares");

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
router.get("/users", [authJwt.verifyToken], userController.list);
router.get("/users/:id", [authJwt.verifyToken], userController.getById);
router.post("/users", userController.add);
router.put("/users", userController.update);
router.delete("/users/:id", userController.delete);
//LOGIN
router.post("/login", userController.login);

module.exports = router;
