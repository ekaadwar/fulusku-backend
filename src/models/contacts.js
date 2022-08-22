const connection = require("../helpers/database");
const table = "contacts";

exports.addContact = (data, cb) => {
  connection.query(
    `INSERT INTO ${table} (user1, user2)
        VALUES (?, ?)
        `,
    [data.user1, data.user2],
    cb
  );
};
