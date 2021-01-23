module.exports = (app) => {
  //controller
  const category = require("../controllers/category.controller.js");
  var router = require("express").Router();

  router.get("/", boxController.box_indexs);
  // router.get("/:id", boxController.box_index);
  // router.post("/", boxController.box_create);
  // router.put("/:id", boxController.box_update);
  // router.delete("/:id", boxController.box_delete);

  app.use("/api/box", router);
};
