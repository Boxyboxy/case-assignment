const { user } = require("../db/models");
const bcrypt = require("bcrypt");
module.exports = {
  async createUser(username, password) {
    const currentDate = new Date();
    bcrypt.hash(password, 10).then((hash) => {
      return user.create({
        username,
        password: hash,
        created_at: currentDate,
        updated_at: currentDate,
      });
    });
  },
  async getUserByUsername(username) {
    const options = {
      where: {},
    };
    options.where = { username };
    return user.findOne(options);
  },
};
