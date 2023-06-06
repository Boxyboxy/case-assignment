const express = require("express");

const tasksController = require("../controllers/tasksController");

const tasksRouter = express.Router();

tasksRouter.get("/", tasksController.getAllTasks);

tasksRouter.get("/:userId", tasksController.getTasksByUserId);
tasksRouter.patch("/:id", tasksController.updateTaskById);
module.exports = tasksRouter;
