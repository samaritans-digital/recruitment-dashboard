const Enquiry = require("../models").Enquiry
const moment = require("moment")
const Parser = require("json2csv").Parser
const parser = new Parser({ fields: [
    "firstName", "lastName", "email", "phone", "branch", "applied", "role", "accessibilityRequirements", "interview"
]})

// Helper function
const buildWhereQuery = (branchId) => {
    let query = {}
    if(branchId) query.branchId = branchId
    return query
}

// Export everything
const index = (req, res, next) => {
    Enquiry.findAll({
        where: buildWhereQuery(req.params.branchId),
        raw: true // Simple JSON only
    })
        .then(applicants=>applicants.map(applicant=>{
            return {
                firstName: applicant.firstName,
                lastName: applicant.lastName, 
                email: applicant.email,
                phone: applicant.phone,
                branch: applicant.branchId,
                applied: applicant.applicationTime,
                role: applicant.role,
                accessibilityRequirements: applicant.accessibilityRequirements,
                interview: (applicant.booking)? "booked" : "none booked"
            }
        }))
        .then(applicants=>{
            const csv = parser.parse(applicants)
            // res.setHeader("Content-Type", "text/csv")
            res.attachment(`applicants-${moment().format("DD-MM-YYYY")}.csv`)
            res.send(csv)
        })
        .catch(err=>{
            console.log(err)
            res.send(err)
        })
}


module.exports = {
    index: index
}

