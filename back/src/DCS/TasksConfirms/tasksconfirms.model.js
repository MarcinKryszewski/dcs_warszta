const { Model, DataTypes, INTEGER, TEXT } = require('sequelize');
const sequelize = require('../database/dcs.database.sqlite');

class TasksConfirm extends Model {}

TasksConfirm.init({
    Id : {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    TaskID : {
        type: DataTypes.INTEGER
    },
    Status : {
        type: DataTypes.TEXT
    },
    PersonID : {
        type: DataTypes.INTEGER
    },
    Date : {
        type: DataTypes.DATEONLY
    }
}, {
    sequelize, 
    modelName: 'tasksConfirm',
    timestamps: false,
    tableName: 'TasksConfirms'
});

module.exports = TasksConfirm;