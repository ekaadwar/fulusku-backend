const route = require("express").Router();
const controllers = require("../controllers/users");
const auth = require("../middleware/auth");

route.get("/profile", auth, controllers.getProfil);

module.exports = route;
