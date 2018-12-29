const getApplication = require("../utils/getApplication")

const index = (req, res)=>{
    getApplication(req.params.enquiryId)
        .then((applicant)=>{
            res.render("applicant.njk", {
                applicant: applicant
            })
        })
}

module.exports = {
    index: index
}