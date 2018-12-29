const Enquiry = require("../models").Enquiry

const index = (req, res)=>{
    res.render("index", {
        username: "test user"
    })
    // res.send("router working")
}

module.exports = {
    index: index
}