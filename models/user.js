"use strict"

const branchNameFromId = require("../utils/branchNameFromId")

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {

        // Virtual columns
        branchName: {
            type: Sequelize.VIRTUAL,
            get: function () {
                return branchNameFromId(this.getDataValue("branchId"))
            }
        },

        email: Sequelize.STRING,
        branchId: Sequelize.STRING,
        admin: Sequelize.BOOLEAN
    }, {})
    return User
}