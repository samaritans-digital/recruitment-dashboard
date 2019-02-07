"use strict"

const AWS = require("aws-sdk")
const fs = require("fs")

const exportFromDynamoDB = new Promise((resolve, reject) => {
    // Configure the dynamodb query
    AWS.config.update({region: process.env.AWS_REGION})
    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    const query = {
        "TableName": process.env.DYNAMODB_TABLE,
        "Limit": 1000
    }
    // Empty array to store data
    let results = []
    // Recursive scan of dynamodb
    const scanDynamoDB = () => {
        dynamoDB.scan(query, (err, data) => {
            if (!err) {
                results = results.concat(data.Items)
                // Is result complete?
                if (data.LastEvaluatedKey) { 
                    // ...Continue querying
                    query.ExclusiveStartKey = data.LastEvaluatedKey
                    scanDynamoDB(query)
                } else {
                    resolve(results)
                }
            } else {
                console.dir(err)
                reject(err)
            }
        })
    }
    // Initial query
    scanDynamoDB()
})


module.exports = {
    up: (queryInterface, Sequelize) => {
        // Run the export
        return exportFromDynamoDB
            .then((results)=> {
                // First, delete any existing table
                queryInterface.bulkDelete("Enquiries", null, {})
                let normalisedEnquiries = []
                results.forEach((rawEnquiry)=>{
                    normalisedEnquiries.push({

                        firstName: rawEnquiry.firstName,
                        lastName: rawEnquiry.lastName,
                        email: rawEnquiry.email,
                        phone: rawEnquiry.phone,
                        accessibilityRequirements: rawEnquiry.accessibilityRequirements,
            
                        applicationTime: rawEnquiry.applicationTime,
                        ip: rawEnquiry.ip,
            
                        role: rawEnquiry.role,
                        branchId: rawEnquiry.branchId,
                        booking: rawEnquiry.booking,
                        bookingDate: rawEnquiry.bookingDate,
            
                        contactAboutPeopleInNeed: rawEnquiry.contactAboutPeopleInNeed,
                        contactAboutFundraising: rawEnquiry.contactAboutFundraising,
                        contactByEmail: rawEnquiry.contactByEmail,
                        contactBySms: rawEnquiry.contactBySms,
                        contactByPhone: rawEnquiry.contactByPhone,
            
                        gender: rawEnquiry.gender,
                        ageRange: rawEnquiry.ageRange,
                        ethnicBackground: rawEnquiry.ethnicBackground,
            
                        enquiryId: rawEnquiry.id,

                        sentMailReminder: rawEnquiry.sentMailReminder,
                        sentSmsReminder: rawEnquiry.sentSmsReminder,

                        createdAt: new Date(),
                        updatedAt: new Date()

                    })
                })
                return queryInterface.bulkInsert("Enquiries", normalisedEnquiries, {}, { 
                    // Because without this explicitly given, seed fails
                    booking: { type: new Sequelize.JSON() } 
                })
            })

    },

    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Enquiries", null, {})
    }
}
