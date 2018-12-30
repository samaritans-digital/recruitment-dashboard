const fetch = require('node-fetch')

module.exports = async (ip) => {
    const response = await fetch(`http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_API_KEY}`)
    const data = await response.json()
    return data
}