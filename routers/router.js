const router = require("express").Router()
const controller = require("../controllers/controller")

router.get("/", controller.index)

module.exports = router