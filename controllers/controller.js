const { Op } = require("sequelize")
const Enquiry = require("../models").Enquiry

// Helper function to work out offsets from pages
const calculateOffset = (page)=>{
    return (page) ? (page-1)*10 : 0
}

// Helper function to work out offsets from pages
const calculatePage = (rawPage)=>{
    return (rawPage) ? parseInt(rawPage) : 1
}

// Get list of recent applicants
const index = (req, res, next)=>{
    Enquiry.findAll({
        // Order by application time or soonest interview
        order: (req.query.sort === "soonest")? [["booking.startTime", "ASC"]] : [["applicationTime", "DESC"]],
        where: (req.query.sort === "soonest")? { booking: { startTime: {[Op.gte]: new Date()} } } : false,
        limit: 10,
        offset: calculateOffset(req.params.page),
        // raw: true // This seems to break virtual columns
    })
        .then((applicants)=>{
            if(applicants.length > 0){
                res.render("index", {
                    error: false,
                    applicants: applicants,
                    page: calculatePage(req.params.page)
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