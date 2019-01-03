const fetch = require("isomorphic-unfetch")

// Using enquiry ID, grab entire applicaton object from frontend app
const getApplication = async (enquiryId) => {
    const endpoint = `${process.env.FRONTEND_HOST}/volunteer/api/v1/applications/${enquiryId}`
    const response = await fetch(endpoint)
    const data = await response.json()
    return data
}

// Get unbooked interview slots by branch ID
const getEvents = async (branchId) => {
    const endpoint = `${process.env.FRONTEND_HOST}/volunteer/api/v1/interview-slots/${branchId}`
    const response = await fetch(endpoint)
    const data = await response.json()
    return data
}

module.exports = {
    getApplication: getApplication,
    getEvents: getEvents
}