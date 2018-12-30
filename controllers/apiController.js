const cxApp = require("../utils/cxApp")
const Enquiry = require("../models").Enquiry

const getKpis = (req, res, next) => {
    res.status(200).json({
        applicants: "",
        unbookedSlots: "",
        waitingTime: ""
    })
}

const getBranchKpis = (req, res, next) => {
    res.status(200).json({
        applicants: "",
        unbookedSlots: "",
        waitingTime: ""
    })
}

module.exports = {
    getKpis: getKpis,
    getBranchKpis: getBranchKpis
}