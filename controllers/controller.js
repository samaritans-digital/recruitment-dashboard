const { Op } = require("sequelize")
const Enquiry = require("../models").Enquiry
const branchNames = require("../branch-names.json")

// Helper function to work out offsets from pages
const calculateOffset = (page)=>{
    return (page) ? (page-1)*10 : 0
}

// Helper function to work out offsets from pages
const calculatePage = (rawPage)=>{
    return (rawPage) ? parseInt(rawPage) : 1
}

// Build filters
const buildWhereQuery = (sort, branch) => {
    let query = {}
    // If sort is specified, filter out past interviews
    if (sort === "soonest") {
        query.booking = { 
            startTime: { [Op.gte]: new Date() }
        }
    }
    // If branch is specified, filter by it here
    if (branch) {
        query.branchId = branch
    }
    return query
}


// Get list of recent applicants
const index = (req, res, next)=>{
    Enquiry.findAll({
        order: (req.query.sort === "soonest")? [["booking.startTime", "ASC"]] : [["applicationTime", "DESC"]],
        where: buildWhereQuery(req.query.sort, req.query.branch),
        // Get an extra record, then pop it off and see how many are left, to see if we're on the last page
        limit: 11,
        offset: calculateOffset(req.params.page),
        // raw: true // This seems to break virtual columns
    })
        .then((applicants)=>{
            // Do we have results?
            if(applicants.length > 0){
                // Work out if we're on the last page
                let lastPage = true
                if(applicants.length === 11){
                    lastPage = false
                    applicants.pop()
                }
                res.render("index", {
                    error: false,
                    applicants: applicants,
                    branches: branchNames,
                    page: calculatePage(req.params.page),
                    branchQuery: req.query.branch,
                    sortQuery: req.query.sort,
                    lastPage: lastPage
                })
            } else {
                next()
            }
        })
        .catch(() => {
            next()
        })
}

module.exports = {
    index: index
}