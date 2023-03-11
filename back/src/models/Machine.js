const { Model, DataTypes, INTEGER, TEXT } = require('sequelize');
const sequelize = require('../services/database/sqlite');

class Machine extends Model {}

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
})

module.exports = Machine;