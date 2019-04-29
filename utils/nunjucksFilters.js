const moment = require("moment")

module.exports = (env) => {

    // Display time since a past event
    env.addFilter("noneGiven", (rawValue) => {
        if(rawValue){
            return rawValue
        } else {
            return "<span class='none-given'>Not given</span>"
        }
    })

    // Display time since a past event
    env.addFilter("timeTo", (rawDate) => {
        return moment().to(rawDate)
    })

    // Convert date to XXth Dec XX Xpm format
    env.addFilter("prettyDate", (rawDate) => {
        return moment(rawDate).format("Do MMM YYYY ha")
    })

    // Pretty up the role field
    env.addFilter("prettyRole", (rawRole) => {
        if(rawRole === "listening-volunteer"){
            return "Listening volunteer"
        } else {
            return "Non-listening volunteer"
        }
    })

    // Pretty up the interview type field
    env.addFilter("prettyInterviewType", (type) => {
        if(type === "video"){
            return "Video"
        } else if (type === "phone") {
            return "Phone"
        } else {
            return "Face to face"
        }
    })

}
