const express = require('express')
const Controller = require('../controllers/adminController')
const router = express.Router()
const {isAdmin, isLogin} = require("../middlewares")
const coursesRoutes = require("./courses")
const categoriesRoutes = require("./categories")

router.get("/", isAdmin, Controller.showAdmin)

router.use("/categories", categoriesRoutes)
router.use("/courses", coursesRoutes)

module.exports = router