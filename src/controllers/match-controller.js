import _ from "lodash";

import HttpStatus from "http-status-codes";
import { createLenderMatchRegistration, confirmEmail } from "../service/linc-service.js";


function handleLenderMatchSubmission(req, res) {
  if ( ("contactSecondaryEmailAddress" in req.body.contactInfoData) ) {
    console.log("honeypot form element was filled.  This was probably submitted by a bot.");
  }
  const errors = [];
  const requiredProperties = [{
    propertyName: "contactInfoData.contactFullName",
    message: "Contact Full Name is required."
  }, {
    propertyName: "contactInfoData.contactPhoneNumber",
    message: "Contact Phone Number is required."
  }, {
    propertyName: "contactInfoData.contactEmailAddress",
    message: "Contact Email Address is required."
  }, {
    propertyName: "businessInfoData.businessInfoName",
    message: "Business Name is required."
  }, {
    propertyName: "businessInfoData.businessInfoZipcode",
    message: "Business Zip Code is required."
  }, {
    propertyName: "industryInfoData.industryType",
    message: "Industry Type is required."
  }, {
    propertyName: "industryInfoData.industryExperience",
    message: "Industry Experience is required."
  }, {
    propertyName: "loanData.loanAmount",
    message: "Loan Amount  is required."
  }, {
    propertyName: "loanData.loanDescription",
    message: "Loan Description is required."
  }];
  _.each(requiredProperties, function(requiredProperty) {
    if (!_.has(req.body, requiredProperty.propertyName)) {
      errors.push("Error: " + requiredProperty.message);
    }
  });
  if (_.isEmpty(errors)) {
    createLenderMatchRegistration({
      name: req.body.contactInfoData.contactFullName,
      phone: req.body.contactInfoData.contactPhoneNumber,
      emailAddress: req.body.contactInfoData.contactEmailAddress,
      businessName: req.body.businessInfoData.businessInfoName,
      businessZip: req.body.businessInfoData.businessInfoZipcode,
      industry: req.body.industryInfoData.industryType,
      industryExperience: req.body.industryInfoData.industryExperience,
      loanAmount: req.body.loanData.loanAmount,
      loanDescription: req.body.loanData.loanDescription
    })
      .then(function() {
        res.status(HttpStatus.OK).send();
      });
  } else {
    console.log(errors);
    res.status(HttpStatus.BAD_REQUEST).send("Error during validation: " + errors.join(","));
  }
}

function handleEmailConfirmation(req, res) {
  if (!("token" in req.query)) {
    res.redirect("/linc/emailinvalid");
  } else {
    confirmEmail(req.query.token)
      .then(function(result) {
        if (result === "success") {
          res.redirect("/linc/emailconfirmed");
        } else if (result === "expired") {
          res.redirect("/linc/emailinvalid");
        } else {
          res.redirect("/linc/emailinvalid");
        }
      });
  }
}
export { handleLenderMatchSubmission, handleEmailConfirmation };
