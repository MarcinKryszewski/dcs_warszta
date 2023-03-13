const { Model, DataTypes, INTEGER, TEXT } = require('sequelize');
const sequelize = require('../database/dcs.database.sqlite');
const Task = require('../Tasks/tasks.model');

class Machine extends Model {}
console.log("Machine");
Machine.init({
    Id : {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Area : {
        type: DataTypes.TEXT
    }, 
    MachineName : {
        type: DataTypes.TEXT
    }, 
    Delete : {
        type: DataTypes.BOOLEAN
    }, 
    DeleteDate : {
        type: DataTypes.DATEONLY
    }
}, {
    sequelize, 
    modelName: 'machine',
    timestamps: false,
    tableName: 'Machines'
});

module.exports = Machine;