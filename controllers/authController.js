const User = require("../models").User
const branchNames = require("../branch-names.json")
const passwordless = require("passwordless")

// Serve the login page
const getLogin = (req, res) => {
    res.render("login")
}

// Determine whether to send magic link
const postLogin = (req, res) => {
    res.json({message: "Magic link has been sent"})
}

// Process magic link and start session
const finishLogin = (req, res) => {
    res.send("Login finished!")
}

const logout = (req, res) => {

}

module.exports = {
    getLogin: getLogin,
    postLogin: postLogin,
    finishLogin: finishLogin,
    logout: logout
}