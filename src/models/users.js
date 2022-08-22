const connection = require("../helpers/database");

const table = "users";

exports.createUsers = (data, cb) => {
  connection.query(
    `
      INSERT INTO ${table} (name, email, pin, phone, security_question, security_answer, saldo)
      VALUES (?, ?, ?, ?, ?,?, 0)
      `,
    [
      data.name,
      data.email,
      data.pin,
      data.phone,
      data.securityQuestion,
      data.securityAnswer,
    ],
    cb
  );
};

exports.getUserByPhone = (phone, cb) => {
  connection.query(
    `SELECT id, phone, pin FROM users WHERE phone=?`,
    [phone],
    cb
  );
};
