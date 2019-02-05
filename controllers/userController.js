const User = require("../models").User
const branchNames = require("../branch-names.json")

// Get list of users
const index = (req, res, next) => {
    let err = false
    if (req.query.err == "create"){ err = "<strong>That user couldn't be created.</strong> Check that the email address is valid and doesn't already exist."}
    if (req.query.err == "delete"){ err = "<strong>That user couldn't be removed.</strong> If the problem continues, please try again later."}
    User.findAll()
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
const createUser = (req, res, next) => {
    User.create({
        email: req.body.email,
        branchId: req.body.branch,
        admin: req.body.administrator
    })
        .then(newUser =>{
            console.log(newUser)
            res.redirect("/users")
        })
        .catch(error=>{
            res.redirect("/users?err=create")
        })
}

// Delete specified user
const deleteUser = (req, res, next) => {
    User.destroy({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            res.redirect("/users")
        })
        .catch(error => {
            res.redirect("/users?err=delete")
        })
}

module.exports = {
    index: index,
    createUser: createUser,
    deleteUser: deleteUser
}