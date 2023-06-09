const { task } = require("../db/models");

module.exports = {
  getAllTasks() {
    return task.findAll();
  },

  getTasksByUserId(options) {
    return task.findAll(options);
  },

  async updateTaskById(id, payload) {
    // eslint-disable-next-line no-unused-vars
    const [_, [updatedTask]] = await task.update(
      { ...payload, updated_at: new Date() },
      // the model is returned when returning:true is specified
      {
        where: { id },
        returning: true,
      }
    );

    const response = updatedTask.toJSON();

    return response;
  },

  async createTask(taskName, done, userId) {
    const currentDate = new Date();

    return task.create({
      task: taskName,
      done,
      userId,
      created_at: currentDate,
      updated_at: currentDate,
    });
  },
};
