const { Model, DataTypes, INTEGER, TEXT } = require('sequelize');
const sequelize = require('../database/dcs.database.sqlite');

class PartsStatus extends Model {}
console.log("PartsStatus");
PartsStatus.init({
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
    modelName: 'partsStatus',
    timestamps: false,
    tableName: 'PartsStatuses'
});

module.exports = PartsStatus;