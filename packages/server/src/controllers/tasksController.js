const {
  getAllTasks,
  getTasksByUserId,
  updateTaskById,
  createTask,
} = require("../repositories/tasksRepository");

module.exports = {
  async getAllTasks(req, res) {
    try {
      const tasks = await getAllTasks();
      return res.json(tasks);
    } catch (err) {
      console.error(err);
    }
  },

  async getTasksByUserId(req, res) {
    try {
      const { userId } = req.params;

      // +id converts a string to number
      if (isNaN(userId) || +userId > Number.MAX_SAFE_INTEGER || +userId < 0) {
        const error = new Error("Category Id must be a valid number");
        error.status = 400;
        throw error;
      }
      const options = {
        where: {},
        order: [["id", "ASC"]],
      };
      if (userId) options.where = { userId };
      const tasks = await getTasksByUserId(options);

      return res.json(tasks);
    } catch (err) {
      console.error(err);
    }
  },

  async updateTaskById(req, res) {
    try {
      const { id } = req.params;

      if (isNaN(id) || +id > Number.MAX_SAFE_INTEGER || +id < 0) {
        const error = new Error("id  must be a valid number");
        error.status = 400;
        throw error;
      }
      const payload = req.body;

      const updatedContribution = await updateTaskById(id, payload);

      return res.json(updatedContribution);
    } catch (err) {
      console.error(err);
    }
  },

  async createTask(req, res) {
    const { task, done, userId } = req.body;
    try {
      const createdTask = await createTask(task, done, userId);
      return res.json(createdTask);
    } catch (err) {
      console.error(err);
    }
  },
};
