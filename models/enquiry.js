'use strict';
module.exports = (sequelize, DataTypes) => {
  var Enquiry = sequelize.define('Enquiry', {

    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    accessibilityRequirements: DataTypes.TEXT,

    applicationTime: DataTypes.DATE,
    ip: DataTypes.STRING,

    role: DataTypes.STRING,
    branchId: DataTypes.STRING,
    booking: DataTypes.JSON,
    bookingDate: DataTypes.DATE,

    contactAboutPeopleInNeed: DataTypes.BOOLEAN,
    contactAboutFundraising: DataTypes.BOOLEAN,
    contactByEmail: DataTypes.BOOLEAN,
    contactBySms: DataTypes.BOOLEAN,
    contactByPhone: DataTypes.BOOLEAN,

    gender: DataTypes.STRING,
    ageRange: DataTypes.STRING,
    ethnicBackground: DataTypes.STRING,

    enquiryId: DataTypes.STRING,

    sentMailReminder: DataTypes.BOOLEAN,
    sentSmsReminder: DataTypes.BOOLEAN

  }, {});
  Enquiry.associate = function(models) {
    // associations can be defined here
  };
  return Enquiry;
};