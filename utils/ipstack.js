const fetch = require('node-fetch')

const findLocation = async (ip) => {
    const response = await fetch(`http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_API_KEY}`)
    const data = await response.json()
    return data
}

// findLocation(ip)
//     .then(data=>console.log(data))

module.exports = findLocation