const cxApp = require("../utils/cxApp")
const Enquiry = require("../models").Enquiry
const { Op } = require("sequelize")
const sequelize = require("sequelize")
const moment = require("moment")
const eventbrite = require("../utils/eventbrite")

// Helper function
const calcAvgWaitingTime = (data) => {
    try {
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
    } catch(e) {
        return null
    }
}


// Nationwide KPIs
const getKpis = (req, res, next) => {
    const applicantsThisMonth = Enquiry.findAndCountAll({
        where: {
            // Application date is within the last 30 days
            applicationTime: { [Op.gt]: moment().subtract(30, "days")}
        }
    })
    const applicantsLastMonth = Enquiry.findAndCountAll({
        where: {
            // Application date is within the last 30 days
            applicationTime: { 
                [Op.gt]: moment().subtract(60, "days"),
                [Op.lt]: moment().subtract(30, "days")
            }
        }
    })
    const events = eventbrite()

    Promise.all([applicantsThisMonth, applicantsLastMonth, events])
        .then((data)=>{
            res.status(200).json({
                applicantCount: data[0].count,
                unbookedSlots: data[2],
                avgWaitingTime: calcAvgWaitingTime(data[0]),

                applicantCountLastMonth: data[1].count,
                avgWaitingTimeLastMonth: calcAvgWaitingTime(data[1])
            })
        })
        .catch(err=>next(err))
}


// Branch KPIs
const getBranchKpis = (req, res, next) => {
    const branchId = req.params.branchId
    const applicantsThisMonth = Enquiry.findAndCountAll({
        where: {
            // Application date is within the last 30 days
            applicationTime: { [Op.gt]: moment().subtract(30, "days")},
            branchId: branchId
        }
    })
    const applicantsLastMonth = Enquiry.findAndCountAll({
        where: {
            // Application date is within the last 30 days
            applicationTime: { 
                [Op.gt]: moment().subtract(60, "days"),
                [Op.lt]: moment().subtract(30, "days")
            },
            branchId: branchId
        }
    })
    const events = cxApp.getEvents(branchId)
    Promise.all([applicantsThisMonth, applicantsLastMonth, events])
        .then((data)=>{
            // res.send(data)
            res.status(200).json({
                applicantCount: data[0].count,
                unbookedSlots: data[2].length,
                avgWaitingTime: calcAvgWaitingTime(data[0]),

                applicantCountLastMonth: data[1].count,
                avgWaitingTimeLastMonth: calcAvgWaitingTime(data[1])
            })
        })
        .catch(err=>next(err))
}


module.exports = {
    getKpis: getKpis,
    getBranchKpis: getBranchKpis
}