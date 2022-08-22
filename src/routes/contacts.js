const route = require("express").Router();
const controllers = require("../controllers/contacts");
const auth = require("../middleware/auth");

route.post("/", auth, controllers.addContact);

module.exports = route;
