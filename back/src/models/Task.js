const { Model, DataTypes, INTEGER, TEXT } = require('sequelize');
const sequelize = require('../services/database/sqlite');

class Task extends Model {}

Task.init({
    Id : {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Description : {
        type: DataTypes.TEXT
    }, 
    Category : {
        type: DataTypes.TEXT
    },
    Priority : {
        type: DataTypes.TEXT
    },
    CreationDate : {
        type: DataTypes.DATEONLY
    },
    FinishDate : {
        type: DataTypes.DATEONLY
    },
    Author : {
        type: DataTypes.INTEGER
    },
    Machine : {
        type: DataTypes.INTEGER
    },
    Responsible : {
        type: DataTypes.INTEGER
    }
}, {
    sequelize, 
    modelName: 'task',
    timestamps: false,
    tableName: 'Tasks'
})

module.exports = Task;