const AWS = require("aws-sdk")
const fs = require("fs")

AWS.config.update({region: process.env.AWS_REGION})

const dynamoDB = new AWS.DynamoDB.DocumentClient()

const query = {
    "TableName": process.env.DYNAMODB_TABLE,
    "Limit": 1000
}

// Empty array to store data
let results = []

const scanDynamoDB = (query) => {
    // Scan entire DB
    dynamoDB.scan(query, (err, data) => {
        if (!err) {
            results = results.concat(data.Items)
            // Is result complete?
            if (data.LastEvaluatedKey) { 
                // ...Continue querying
                query.ExclusiveStartKey = data.LastEvaluatedKey
                scanDynamoDB(query)
            } else {
                // ...Finally, save to file
                fs.writeFile("./enquiries.json", JSON.stringify(results), "utf8", (err) => {
                    if (err) {
                        return console.log(err)
                    }
                    console.log("👍  Data file saved")
                })
            }
        } else {
            console.dir(err)
        }
    })
}

// Start first query
scanDynamoDB(query)