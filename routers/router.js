const router = require("express").Router()
const passwordless = require("passwordless")
const controller = require("../controllers/controller")
const authController = require("../controllers/authController")
const applicantController = require("../controllers/applicantController")
const apiController = require("../controllers/apiController")
const exportController = require("../controllers/exportController")

// API
router.get("/api/kpis/:branchId", apiController.getBranchKpis)
router.get("/api/kpis", apiController.getKpis)

// Auth
router.get("/login", authController.getLogin)
router.post("/login", passwordless.requestToken(authController.sendMagicLink), authController.postLogin)
router.get("/login/finish", passwordless.acceptToken(), authController.finishLogin)
router.get("/logout", authController.logout)

// List and detail views
router.get("/page/:page", controller.index)
router.get("/", controller.index)
router.get("/applicant/:enquiryId", applicantController.index)

// Export
router.get("/export/:branchId", exportController.index)
router.get("/export/", exportController.index)

module.exports = router