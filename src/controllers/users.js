const fs = require("fs");
const { response: standardResponse } = require("../helpers/standardResponse");
const modelUsers = require("../models/users");

exports.getProfil = (req, res) => {
  modelUsers.getUserById(req.authUser.id, (error, results) => {
    if (!error) {
      if (results[0].photo !== null) {
        results[0].photo = `${APP_URL}${results[0].photo}`;
      }
      return standardResponse(
        res,
        200,
        true,
        "Get Profile successfuly!",
        results[0]
      );
    } else {
      return standardResponse(
        res,
        404,
        false,
        `Data not found! error : ${error.sqlMessage}`
      );
    }
  });
};
