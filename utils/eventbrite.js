const fetch = require("isomorphic-unfetch")

// Get the number of live events on the organiser
module.exports = async () => {
    try {
        const endpoint = `https://www.eventbriteapi.com/v3/organizations/${process.env.EVENTBRITE_ORGANISER}/events/?status=live&page_size=1&time_filter=current_future&token=${process.env.EVENTBRITE_TOKEN}`
        const response = await fetch(endpoint)
        const data = await response.json()
        // Return the number of results
        return data.pagination.object_count
    } catch(e) {
        return null
    }
}