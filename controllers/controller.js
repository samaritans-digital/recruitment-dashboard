const Enquiry = require("../models").Enquiry

const index = (req, res)=>{
    res.send("router working")
}

module.exports = {
    index: index
}