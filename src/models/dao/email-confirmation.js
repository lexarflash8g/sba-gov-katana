import { dbConnection } from "../mongodb.js";
import Promise from "bluebird";
import uuid from "uuid";
import _ from "lodash";

function create(newConfirmation) {
  const toInsert = _.merge({}, newConfirmation, {
    _id: uuid.v4()
  });
  return new Promise((resolve, reject) => {
    var collection = dbConnection.collection("emailConfirmation");
    // Insert some documents
    collection.insert(toInsert, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function retrieve(tokenString) {
  return new Promise((resolve, reject) => {
    var collection = dbConnection.collection("emailConfirmation");
    // Insert some documents
    collection.findOne({
      token: tokenString
    }, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function update(emailConfirmation) {
  return new Promise((resolve, reject) => {
    var collection = dbConnection.collection("emailConfirmation");
    // Insert some documents
    collection.findOneAndReplace({
      token: emailConfirmation.token
    }, emailConfirmation, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
export { create, retrieve, update };