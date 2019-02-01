"use strict"
const sequelize = require("sequelize")

module.exports = {
    
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE TABLE "session" (
            "sid" varchar NOT NULL COLLATE "default",
              "sess" json NOT NULL,
              "expire" timestamp(6) NOT NULL
          )
          WITH (OIDS=FALSE);
          ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;`)
    },
    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("session")
    }
}