const { Model, DataTypes, INTEGER, TEXT } = require('sequelize');
const sequelize = require('../services/database/sqlite');

class Person extends Model {}

Person.init({
    Id : {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Name : {
        type: DataTypes.TEXT
    }, 
    Surname : {
        type: DataTypes.TEXT
    },
    Login : {
        type: DataTypes.TEXT
    }
}, {
    sequelize, 
    modelName: 'person',
    timestamps: false,
    tableName: 'Persons'
})

module.exports = Person;