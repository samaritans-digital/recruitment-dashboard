"use strict"
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("passwordless", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            uid: {
                type: Sequelize.STRING(160),
                unique: true
            },
            token: {
                allowNull: false,
                type: Sequelize.STRING(60),
                unique: true
            },
            origin: {
                type: Sequelize.TEXT
            },
            ttl: {
                type: Sequelize.BIGINT
            }

        })
    },
    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("passwordless")
    }
}