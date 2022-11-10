const express = require("express");
const Controller = require("../controllers/loginController");
const router = express.Router();
const userRoutes = require("./users");
const adminRoutes = require("./admin");
const {isLogin} = require('../middlewares')




router.get("/", (req, res) => res.redirect("/login"));
router.get("/login", isLogin, Controller.login);
router.post("/login", Controller.submitLogin);
router.get("/register", Controller.register);
router.post("/register", Controller.submitRegister);
router.use(function (req, res, next) {
  if (!req.session.user) {
    const error = "Please login first";
    res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
});

router.use("/admin", adminRoutes);
router.use("/user", userRoutes);

module.exports = router;