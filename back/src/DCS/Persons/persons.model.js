const { Model, DataTypes, INTEGER, TEXT } = require('sequelize');
const sequelize = require('../database/dcs.database.sqlite');

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
    },
    Role : {
        type: DataTypes.TEXT,
        defaultValue: 2
    },  
    Delete : {
        type: DataTypes.BOOLEAN
    }, 
    DeleteDate : {
        type: DataTypes.DATEONLY
    }
}, {
    sequelize, 
    modelName: 'person',
    timestamps: false,
    tableName: 'Persons'
})

module.exports = Person;