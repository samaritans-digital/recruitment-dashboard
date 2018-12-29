const getApplication = require("../utils/getApplication")

const index = (req, res)=>{
    res.render("applicant.njk")
}

module.exports = {
    index: index
}