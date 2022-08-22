require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const port = process.env.PORT;

const { APP_UPLOAD_ROUTE, APP_UPLOAD_PATH } = process.env;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(APP_UPLOAD_ROUTE, express.static(APP_UPLOAD_PATH));

app.get("/", (req, res) => {
  const data = {
    success: true,
    message: "halo World",
  };
  return res.json(data);
});

const routeAuth = require("./src/routes/auth");
const routeUsers = require("./src/routes/users");
const routeContacts = require("./src/routes/contacts");

app.use("/auth", routeAuth);
app.use("/users", routeUsers);
app.use("/contacts", routeContacts);

app.listen(port, () => {
  console.log("App running ini port 8080");
});
