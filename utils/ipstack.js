const fetch = require('isomorphic-unfetch')

module.exports = async (ip) => {
    const response = await fetch(`http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_API_KEY}`)
    const data = await response.json()
    return data
}