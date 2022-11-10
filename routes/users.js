const express = require("express");
const Controller = require("../controllers/userController");
const router = express.Router();
const { isUser} = require("../middlewares");

router.get("/:userId", isUser, Controller.showUser);

router.get("/:userId/addCourse", Controller.formAddCourse)
module.exports = router;
