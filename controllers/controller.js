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
const index = (req, res)=>{
    Enquiry.findAll({
        order: [["applicationTime", "DESC"]],
        limit: 10,
        offset: calculateOffset(req.params.page),
        // raw: true // This seems to break virtual columns
    })
        .then((applicants)=>{
            res.render("index", {
                error: false,
                applicants: applicants,
                page: calculatePage(req.params.page)
            })
        })
        .catch(() => {
            res.status(500).render("index", {
                error: true,
                applicants: null
            })
        })
}

module.exports = {
    index: index
}