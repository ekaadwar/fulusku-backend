const { response: standardResponse } = require("../helpers/standardResponse");
const modelUsers = require("../models/users");
const modelContacts = require("../models/contacts");

exports.addContact = (req, res) => {
  const { contact } = req.body;
  if (contact) {
    const { id } = req.authUser;
    modelUsers.getUserByPhone(contact, (error, results) => {
      if (!error) {
        if (results.length > 0) {
          if (results[0].id === id) {
            console.log("The number is yours");
          } else {
            const data = {
              user1: id,
              user2: results[0].id,
            };
            modelContacts.addContact(data, (error, resContact) => {
              if (!error) {
                return standardResponse(
                  res,
                  200,
                  true,
                  `Contact added successfully.`
                );
              } else {
                return standardResponse(
                  res,
                  500,
                  false,
                  `Contact failed to add.`
                );
              }
            });
          }
        } else {
          console.log("Phone number is not registered");
        }
      } else {
        console.log(error);
      }
    });
  } else {
    return standardResponse(res, 404, false, `Input field cannot be empty.`);
  }
};
