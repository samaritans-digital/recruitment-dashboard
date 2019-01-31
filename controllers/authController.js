const User = require("../models").User
const branchNames = require("../branch-names.json")

// Serve the login page
const getLogin = (req, res) => {
    res.render("login")
}

// Determine whether to send magic link
const postLogin = (req, res) => {
    console.log(req.body)


    if(req.body.email){
        // Check if the supplied email exists in DB
        User.findOne({
            where: {
                email: req.body.email
            },
            raw: true
        })
            .then(user => {
                // User exists, so generate token...
                console.log(user)

                // ...and send token by email
            })
    

    }


}

// Process magic link and start session
const finishLogin = (req, res) => {

}

const logout = (req, res) => {

}

module.exports = {
    getLogin: getLogin,
    postLogin: postLogin,
    finishLogin: finishLogin,
    logout: logout
}