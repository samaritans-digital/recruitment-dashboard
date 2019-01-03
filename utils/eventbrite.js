const fetch = require("isomorphic-unfetch")

// Get the number of live events on the organiser
module.exports = async () => {
    try {
        const organiserId = "214727807127"
        const endpoint = `https://www.eventbriteapi.com/v3/organizations/${organiserId}/events/?status=live&page_size=1&time_filter=current_future&token=${process.env.EVENTBRITE_TOKEN}`
        const response = await fetch(endpoint)
        const data = await response.json()
        // Return the number of results
        return data.pagination.object_count
    } catch(e) {
        return null
    }
}