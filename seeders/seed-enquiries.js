"use strict"

const rawEnquiries = require("../enquiries.json")

module.exports = {
    up: (queryInterface, Sequelize) => {
        queryInterface.bulkDelete("Enquiries", null, {})

        let normalisedEnquiries = []

        rawEnquiries.forEach((rawEnquiry)=>{
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
    },

    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Enquiries", null, {})
    }
}
