const router = require("express").Router()
const controller = require("../controllers/controller")

router.get("/page/:page", controller.index)
router.get("/", controller.index)

module.exports = router