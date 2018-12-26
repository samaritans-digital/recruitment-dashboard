// Load config
require('dotenv').config()

// Get model
const Enquiry = require('./models').Enquiry


// Enquiry.findByPk(1, {
//   raw: true,
// })
//   .then(data => console.log(data))
//   .catch(err => console.log(err))