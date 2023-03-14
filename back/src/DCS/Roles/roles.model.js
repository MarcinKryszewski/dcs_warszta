const { Model, DataTypes, INTEGER, TEXT } = require('sequelize');
const sequelize = require('../database/dcs.database.sqlite');

class Role extends Model {}

Role.init({
    Id : {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Name : {
        type: DataTypes.TEXT
    }
}, {
    sequelize, 
    modelName: 'role',
    timestamps: false,
    tableName: 'Roles'
});

module.exports = Role;