const { Model, DataTypes, INTEGER, TEXT } = require("sequelize");
const sequelize = require("../database/dcs.database.sqlite");

class Task extends Model {}

Task.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Description: {
      type: DataTypes.TEXT,
    },
    Category: {
      type: DataTypes.TEXT,
    },
    Priority: {
      type: DataTypes.TEXT,
    },
    CreationDate: {
      type: DataTypes.DATEONLY,
    },
    FinishDate: {
      type: DataTypes.DATEONLY,
    },
    AuthorId: {
      type: DataTypes.INTEGER,
    },
    MachineId: {
      type: DataTypes.INTEGER,
    },
    ResponsibleId: {
      type: DataTypes.INTEGER,
    },
    Delete: {
      type: DataTypes.BOOLEAN,
    },
    DeleteDate: {
      type: DataTypes.DATEONLY,
    },
    LastStatus: {
      type: DataTypes.TEXT,
    },
    PartsStatus: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "task",
    timestamps: false,
    tableName: "Tasks",
    id: false,
  }
);

module.exports = Task;
