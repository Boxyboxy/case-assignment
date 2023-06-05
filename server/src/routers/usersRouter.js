const express = require("express");

const usersController = require("../controllers/usersController");
const usersRouter = express.Router();
usersRouter.post("/register", usersController.createUser);
usersRouter.post("/login", usersController.login);
module.exports = usersRouter;
