const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { response } = require("../helpers/standardResponse");
const modelUsers = require(`../models/users.js`);

exports.register = async (req, res) => {
  const data = req.body;
  data.pin = await bcrypt.hash(data.pin, await bcrypt.genSalt());

  modelUsers.createUsers(data, (error) => {
    if (!error) {
      return response(res, 200, true, "Register successfully!");
    } else {
      return response(
        res,
        500,
        false,
        `Register failed! Error : ${error.sqlMessage}. sql : ${error.sql}`
      );
    }
  });
};

exports.login = (req, res) => {
  const { phone, pin } = req.body;
  modelUsers.getUserByPhone(phone, async (error, results) => {
    if (!error) {
      if (results.length > 0) {
        const user = results[0];
        const userId = user.id;

        const compare = await bcrypt.compare(pin, user.pin);
        if (compare) {
          const payload = { id: user.id, phone: user.phone };
          const token = jwt.sign(payload, process.env.APP_KEY);
          response(res, 200, true, "Welcome!", { userId, token });
        } else {
          response(res, 401, false, "Phone number or PIN is wrong!");
        }
      } else {
        response(res, 404, false, "Phone not registered.");
      }
    } else {
      response(res, 400, false, "An error occured");
    }
  });
};
