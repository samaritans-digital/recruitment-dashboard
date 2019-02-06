const router = require("express").Router()
const passwordless = require("passwordless")
const controller = require("../controllers/controller")
const authController = require("../controllers/authController")
const applicantController = require("../controllers/applicantController")
const apiController = require("../controllers/apiController")
const exportController = require("../controllers/exportController")
const userController = require("../controllers/userController")

// Auth
router.get("/login", authController.getLogin)
router.post("/login", passwordless.requestToken(authController.sendMagicLink, { failureRedirect: "/login/invalid" }), authController.checkEmail)
router.get("/login/finish", passwordless.acceptToken({
    successRedirect: "/"
}))
router.get("/login/invalid", authController.invalid)
router.get("/logout", passwordless.logout(), authController.logout)

// Everything below here needs auth
router.use(passwordless.restricted({ failureRedirect: "/login" }))
router.use(authController.isAdmin)

// API
router.get("/api/kpis/:branchId", apiController.getBranchKpis)
router.get("/api/kpis", apiController.getKpis)

// Export
router.get("/export/:branchId", exportController.index)
router.get("/export/", authController.adminsOnly, exportController.index)

// Users
router.get("/users", authController.adminsOnly, userController.index)
router.post("/users", authController.adminsOnly, userController.createUser)
router.post("/users/delete", authController.adminsOnly, userController.deleteUser)

// List and detail views
router.get("/page/:page", controller.index)
router.get("/applicant/:enquiryId", applicantController.index)
router.get("/", controller.index)
router.get("/statistics", controller.statistics)

module.exports = router