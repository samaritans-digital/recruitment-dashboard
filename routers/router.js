const router = require("express").Router()
const passwordless = require("passwordless")
const controller = require("../controllers/controller")
const authController = require("../controllers/authController")
const applicantController = require("../controllers/applicantController")
const apiController = require("../controllers/apiController")
const exportController = require("../controllers/exportController")

// Auth
router.get("/login", authController.getLogin)
router.post("/login", passwordless.requestToken(authController.sendMagicLink), authController.postLogin)
router.get("/login/finish", passwordless.acceptToken({ successRedirect: "/"}))
router.get("/logout", authController.logout)

// Everything below here needs auth
router.use(passwordless.restricted({ failureRedirect: "/login" }))

// API
router.get("/api/kpis/:branchId", apiController.getBranchKpis)
router.get("/api/kpis", apiController.getKpis)

// List and detail views
router.get("/page/:page", controller.index)
router.get("/", controller.index)
router.get("/applicant/:enquiryId", passwordless.restricted({ failureRedirect: "/login" }), applicantController.index)

// Export
router.get("/export/:branchId", exportController.index)
router.get("/export/", exportController.index)

module.exports = router