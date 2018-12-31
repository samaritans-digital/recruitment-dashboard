const cxApp = require("../utils/cxApp")
const Enquiry = require("../models").Enquiry
const { Op } = require("sequelize")
const sequelize = require("sequelize")
const moment = require("moment")

const getKpis = (req, res, next) => {
    const applicants = Enquiry.findAndCountAll({
        where: {
            applicationTime: { [Op.gt]: moment().subtract(30, "days")}
        }
    })

    Promise.all([applicants])
        .then((data)=>{
            console.log(data)
            res.status(200).json({
                applicants: data[0].count,
                unbookedSlots: "",
                waitingTime: ""
            })
        })
        .catch(err=>{
            console.log(err)
            next()
        })
}



const getBranchKpis = (req, res, next) => {

    const branchId = req.params.branchId

    cxApp.getEvents(branchId)
        .then((events)=>{
            res.status(200).json({
                applicants: "",
                unbookedSlots: events.length,
                waitingTime: ""
            })
        })
}


module.exports = {
    getKpis: getKpis,
    getBranchKpis: getBranchKpis
}