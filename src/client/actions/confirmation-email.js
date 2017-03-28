import axios from "axios";
import queryString from "querystring";
import config from "../services/config.js";
import { logEvent } from "../services/analytics.js";

export function resendConfirmationEmail(emailAddress) {
  return function(dispatch) {
    logEvent({
      category: "Email",
      action: "Resend Email Button Pushed",
      label: ""
    });
    axios.post(config.routes.confirmationEmail, {
      emailAddress: emailAddress
    })
      .then((response) => {
        dispatch({
          type: "RESEND_CONFIRMATION_EMAIL_SUCCESS",
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: "RESEND_CONFIRMATION_EMAIL_ERROR",
          payload: error
        });
      });
  };
}
