var express = require("express");
var router = express.Router();

/*Controllers*/

const userController = require("../controllers").user;
const userTypeController = require("../controllers").userType;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* UserType Router */
router.get("/api/userTypes", userTypeController.list);
router.post("/api/userTypes", userTypeController.add);

/* users Router */
router.get("/api/users", userController.list);
router.post("/api/users", userController.add);

/* Classroom Router */
// router.get("/api/classroom", classroomController.list);
// router.get("/api/classroom/:id", classroomController.getById);
// router.post("/api/classroom", classroomController.add);
// router.put("/api/classroom/:id", classroomController.update);
// router.delete("/api/classroom/:id", classroomController.delete);

module.exports = router;
