const User = require("../models").User
const branchNames = require("../branch-names.json")
const emails = require("../utils/emails")

// Get list of users
const index = (req, res, next) => {
    let err = false
    if (req.query.err == "create"){ err = "<strong>That user couldn't be created.</strong> Check that the email address is valid and doesn't already exist."}
    if (req.query.err == "delete"){ err = "<strong>That user couldn't be removed.</strong> If the problem continues, please try again later."}
    User.findAll({
        order: [
            ["admin", "ASC"]
        ]
    })
        .then((users)=>{
            res.render("users", {
                users: users,
                branches: branchNames,
                error: err
            })
        })
        .catch(() => {
            next()
        })
}

// Create a new user
const createUser = (req, res) => {
    User.create({
        email: req.body.email,
        branchId: req.body.branch,
        admin: req.body.administrator
    })
        .then(newUser =>{
            emails.sendWelcomeEmail(newUser.email)
            res.redirect("/users")
        })
        .catch(() => {
            res.redirect("/users?err=create")
        })
}

// Delete specified user
const deleteUser = (req, res) => {
    User.destroy({
        where: {
            email: req.body.email
        }
    })
        .then(() => {
            res.redirect("/users")
        })
        .catch(() => {
            res.redirect("/users?err=delete")
        })
}

module.exports = {
    index: index,
    createUser: createUser,
    deleteUser: deleteUser
}