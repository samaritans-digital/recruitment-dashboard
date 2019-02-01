const User = require("../models").User
const branchNames = require("../branch-names.json")
const passwordless = require("passwordless")

// Serve the login page
const getLogin = (req, res) => {
    res.render("login")
}

// Send magic link
const sendMagicLink = (email, delivery, callback, req) => {
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
    res.render("login-check-email")
}

const tokenAlreadyUsed = (req, res) => {
    res.render("login-already-used")
}

// Process magic link and start session
const finishLogin = (req, res) => {
    res.send("Login finished!")
}

const logout = (req, res) => {
    res.redirect("/login")
}

module.exports = {
    getLogin: getLogin,
    sendMagicLink: sendMagicLink,
    checkEmail: checkEmail,
    tokenAlreadyUsed: tokenAlreadyUsed,
    finishLogin: finishLogin,
    logout: logout
}