const cxApp = require("../utils/cxApp")
const ipStack = require("../utils/ipstack")
const branchNameFromId = require("../utils/branchNameFromId")

// Helper function to work out whether interview is in past
const isInterviewComplete = (applicant) => {
    try {
        return new Date() > new Date(applicant.booking.startTime)
    } catch(e) {
        console.log(e)
        return false
    }
}

const index = async (req, res, next) => {
    try {
        const applicant = await cxApp.getApplication(req.params.enquiryId)
        const location = await ipStack(applicant.ip)
        res.render("applicant.njk", {
            applicant: applicant,
            branch: branchNameFromId(applicant.branchId),
            location: location,
            interviewComplete: isInterviewComplete(applicant)
        })
    } catch(e) {
        console.log(e)
        next()
    }
}

module.exports = {
    index: index
}