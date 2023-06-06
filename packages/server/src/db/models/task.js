"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user);
    }
  }
  task.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      task: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      done: DataTypes.BOOLEAN,
      file: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "task",
      underscored: true,
    }
  );
  return task;
};
