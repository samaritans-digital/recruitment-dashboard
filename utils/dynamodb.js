const AWS = require('aws-sdk')
const unmarshalItem = require('dynamodb-marshaler').unmarshalItem
const unmarshal = require('dynamodb-marshaler').unmarshal
const Papa = require('papaparse')

// Empty arrays to store data
let headers = []
let unMarshalledArray = []

AWS.config.update({region: 'eu-west-2'})

const dynamoDB = new AWS.DynamoDB()

const query = {
  "TableName": "Volunteer-Beta-Applications",
  "Limit": 1000
}

const scanDynamoDB = (query) => {
  dynamoDB.scan(query, (err, data) => {
    if (!err) {
      unMarshalIntoArray(data.Items)

      // Is result complete?
      if (data.LastEvaluatedKey) { 
        // ...Continue querying
        query.ExclusiveStartKey = data.LastEvaluatedKey
        scanDynamoDB(query)
      } else {
        // ...Finally, log everything out
        console.log(Papa.unparse( { fields: [ ...headers ], data: unMarshalledArray } ))
      }
    }
    else {
      console.dir(err)
    }
  })
}

// Process raw data into JS array
const unMarshalIntoArray = (items) => {
  if ( items.length === 0 )
    return
  items.forEach( (row) => {
    let newRow = {}
    Object.keys( row ).forEach( (key) => {
      if ( headers.indexOf( key.trim() ) === -1 ) {
        headers.push( key.trim() )
      }
      let newValue = unmarshal( row[key] )
      if ( typeof newValue === 'object' ) {
        newRow[key] = JSON.stringify( newValue )
      }
      else {
        newRow[key] = newValue
      }
    })
    unMarshalledArray.push( newRow )
  })
}

module.exports = function(){
    scanDynamoDB(query)
}
