const router = require("express").Router()
const controller = require("../controllers/controller")
const applicantController = require("../controllers/applicantController")

// List view
router.get("/page/:page", controller.index)
router.get("/", controller.index)

// Applicant details
router.get("/applicant/:enquiryId", applicantController.index)

module.exports = router