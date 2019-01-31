const router = require("express").Router()
const controller = require("../controllers/controller")
const authController = require("../controllers/authController")
const applicantController = require("../controllers/applicantController")
const apiController = require("../controllers/apiController")
const exportController = require("../controllers/exportController")

const User = require("../models").User
const passwordless = require("passwordless")


// API
router.get("/api/kpis/:branchId", apiController.getBranchKpis)
router.get("/api/kpis", apiController.getKpis)

// Auth
router.get("/login", authController.getLogin)




router.post("/login", passwordless.requestToken((user, delivery, callback, req) => {

    User.findOne({
        where: {
            email: user
        }
    })
        .then(user=>{
            console.log("😃  User found, sending magic link")
            callback(null, user.id)
        })
        .catch(err=>{
            console.log("😒  User not found. Email will NOT be sent")
            callback(null, null)
        })
    

        
}), (req, res)=>{
    console.log("got to the bottom")
})





router.get("/login/finish", authController.finishLogin)
router.get("/logout", authController.logout)

// List and detail views
router.get("/page/:page", controller.index)
router.get("/", controller.index)
router.get("/applicant/:enquiryId", applicantController.index)

// Export
router.get("/export/:branchId", exportController.index)
router.get("/export/", exportController.index)

module.exports = router