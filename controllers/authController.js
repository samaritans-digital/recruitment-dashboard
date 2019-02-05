const User = require("../models").User
const branchNames = require("../branch-names.json")
const passwordless = require("passwordless")

// Serve the login page
const getLogin = (req, res) => {
    res.render("login")
}

// Send magic link
const sendMagicLink = (email, delivery, callback) => {
    User.findOne({
        where: {
            email: email
        }
    })
        .then(user=>{
            if(user){
                callback(null, user.id)
                console.log("😃  User found, sending magic link")
            } else {
                callback(null, null)
                console.log("😒  User not found. Email will NOT be sent")
            }
        })
        .catch(err=>{
            callback(err, null)
        })
}

const checkEmail = (req, res) => {
    res.render("login-check-email", {
        email: req.body.user
    })
}

const tokenAlreadyUsed = (req, res) => {
    res.render("login-already-used")
}

// Process magic link and start session
const finishLogin = (req, res) => {
    res.send("Login finished!")
}

// Clear token and log out
const logout = (req, res) => {
    res.redirect("/login")
}

// Check whether user is admin
const isAdmin = (req, res, next) => {
    User.findById(req.user)
        .then(user=> {
            res.locals = {
                isAdmin: (user.isAdmin)? true : false,
                userBranch: user.branchId
            }
            next()
        })
}

// Only permit requests from administrators
const adminsOnly = (req, res, next) => {
    if(res.locals.isAdmin === true){
        next()
    } else {
        res.redirect("/")
    }
}

module.exports = {
    getLogin: getLogin,
    sendMagicLink: sendMagicLink,
    checkEmail: checkEmail,
    tokenAlreadyUsed: tokenAlreadyUsed,
    finishLogin: finishLogin,
    logout: logout,
    isAdmin: isAdmin,
    adminsOnly: adminsOnly
}