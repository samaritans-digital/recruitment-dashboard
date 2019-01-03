const cxApp = require("../utils/cxApp")
const Enquiry = require("../models").Enquiry
const { Op } = require("sequelize")
const sequelize = require("sequelize")
const moment = require("moment")
const eventbrite = require("../utils/eventbrite")

// Helper function
const calcAvgWaitingTime = (data) => {
    // Get array of all waiting times
    let waitingTimes = data.rows
        .map(row=>{
            return row.waitingTime
        })
        .filter(waitingTime=>{
            return waitingTime
        })
    // Return the mean
    return Math.round(waitingTimes.reduce((a, b)=>{
        return a + b
    }) / waitingTimes.length)
}


// Nationwide KPIs
const getKpis = (req, res, next) => {
    const applicants = Enquiry.findAndCountAll({
        where: {
            // Application date is within the last 30 days
            applicationTime: { [Op.gt]: moment().subtract(30, "days")}
        }
    })
    const events = eventbrite()

    Promise.all([applicants, events])
        .then((data)=>{
            res.status(200).json({
                applicantCount: data[0].count,
                unbookedSlots: data[1],
                avgWaitingTime: (data[0].count) ? calcAvgWaitingTime(data[0]) : null
            })
        })
        .catch(err=>next())
}


// Branch KPIs
const getBranchKpis = (req, res, next) => {
    const branchId = req.params.branchId
    const applicants = Enquiry.findAndCountAll({
        where: {
            // Application date is within the last 30 days
            applicationTime: { [Op.gt]: moment().subtract(30, "days")},
            branchId: branchId
        }
    })
    const events = cxApp.getEvents(branchId)
    Promise.all([applicants, events])
        .then((data)=>{
            // res.send(data)
            res.status(200).json({
                applicantCount: data[0].count,
                unbookedSlots: data[1].length,
                avgWaitingTime: (data[0].count) ? calcAvgWaitingTime(data[0]) : null
            })
        })
        .catch(err=>next())
}


module.exports = {
    getKpis: getKpis,
    getBranchKpis: getBranchKpis
}