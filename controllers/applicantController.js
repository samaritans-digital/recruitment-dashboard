const cxApp = require("../utils/cxApp")
const ipStack = require("../utils/ipstack")

const index = async (req, res, next) => {
    try {
        const applicant = await cxApp.getApplication(req.params.enquiryId)
        const branch = await cxApp.getBranch(applicant.branchId)
        const location = await ipStack(applicant.ip)
        res.render("applicant.njk", {
            applicant: applicant,
            branch: branch.branch,
            location: location
        })
    } catch(e) {
        console.log(e)
        next()
    }
}

module.exports = {
    index: index
}