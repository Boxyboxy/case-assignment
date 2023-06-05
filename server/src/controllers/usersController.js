const {
  createUser,
  getUserByUsername,
} = require("../repositories/usersRepository");
const bcrypt = require("bcrypt");
module.exports = {
  async createUser(req, res) {
    const { username, password } = req.body;
    try {
      const createdUser = await createUser(username, password);
      return res.json("Success");
    } catch (err) {
      const error = new Error("Username exists");
      error.status = 400;
      throw error;
    }
  },
  async login(req, res) {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    const user = await getUserByUsername(username);
    if (!user) {
      const error = new Error("Username does not exist, please create user");
      error.status = 400;
      throw error;
    }

    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        const error1 = new Error("Wrong username and password combination");
        error1.status = 401;
        throw error1;
      }
      return res.json("You logged in!");
    });
  },
};
