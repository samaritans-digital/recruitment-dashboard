"use strict"
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Enquiries", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            firstName: Sequelize.STRING,
            lastName: Sequelize.STRING,
            email: Sequelize.STRING,
            phone: Sequelize.STRING,
            accessibilityRequirements: Sequelize.TEXT,
  
            applicationTime: Sequelize.DATE,
            ip: Sequelize.STRING,
  
            role: Sequelize.STRING,
            branchId: Sequelize.STRING,
            booking: Sequelize.JSON,
            bookingDate: Sequelize.DATE,
  
            contactAboutPeopleInNeed: Sequelize.BOOLEAN,
            contactAboutFundraising: Sequelize.BOOLEAN,
            contactByEmail: Sequelize.BOOLEAN,
            contactBySms: Sequelize.BOOLEAN,
            contactByPhone: Sequelize.BOOLEAN,
  
            gender: Sequelize.STRING,
            ageRange: Sequelize.STRING,
            ethnicBackground: Sequelize.STRING,
  
            enquiryId: Sequelize.STRING,
  
            sentMailReminder: Sequelize.BOOLEAN,
            sentSmsReminder: Sequelize.BOOLEAN,

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Enquiries")
    }
}