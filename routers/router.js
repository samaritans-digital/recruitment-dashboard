const router = require("express").Router()
const controller = require("../controllers/controller")
const applicantController = require("../controllers/applicantController")
const apiController = require("../controllers/apiController")

// API
router.get("/api/kpis/:branchId", apiController.getBranchKpis)
router.get("/api/kpis", apiController.getKpis)

// UI
router.get("/page/:page", controller.index)
router.get("/", controller.index)
router.get("/applicant/:enquiryId", applicantController.index)

module.exports = router