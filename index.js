const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-2'})
const db = new AWS.DynamoDB()

db.listTables({}, (err, data) => {
    err ? console.log(err, err.stack) : console.log(data)
})

db.scan({
    TableName: 'Volunteer-Beta-Applications'
}, (err, data ) => {
    err ? console.log(err, err.stack) : console.log(data)
})