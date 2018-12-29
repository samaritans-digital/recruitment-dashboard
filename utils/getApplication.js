const fetch = require("node-fetch")

// Using enquiry ID, grab entire applicaton object from frontend app
module.exports = async (enquiryId) => {
    const endpoint = `${process.env.FRONTEND_HOST}/volunteer/api/v1/applications/${enquiryId}`
    const response = await fetch(endpoint)
    const data = await response.json()
    return data
}
