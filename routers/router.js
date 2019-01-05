const router = require("express").Router()
const controller = require("../controllers/controller")
const applicantController = require("../controllers/applicantController")
const apiController = require("../controllers/apiController")
const exportController = require("../controllers/exportController")

// API
router.get("/api/kpis/:branchId", apiController.getBranchKpis)
router.get("/api/kpis", apiController.getKpis)

// UI
router.get("/page/:page", controller.index)
router.get("/", controller.index)
router.get("/search", controller.search)

router.get("/applicant/:enquiryId", applicantController.index)


// Export
router.get("/export/:branchId", exportController.index)
router.get("/export/", exportController.index)

module.exports = router