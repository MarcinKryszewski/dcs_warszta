const { Model, DataTypes, INTEGER, TEXT } = require('sequelize');
const sequelize = require('../services/database/sqlite');
const Machine = require('./Machine');

class Task extends Model {
    
    /*static associate(models) {
        this.belongsTo(Machine, {foreignKey: 'Machine', as: 'Machine'})
    } */
}

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
    AuthorId : {
        type: DataTypes.INTEGER,
    },
    MachineId : {
        type: DataTypes.INTEGER
    },
    ResponsibleId : {
        type: DataTypes.INTEGER
    }, 
    Delete : {
        type: DataTypes.BOOLEAN
    }, 
    DeleteDate : {
        type: DataTypes.DATEONLY
    }
}, {
    sequelize, 
    modelName: 'task',
    timestamps: false,
    tableName: 'Tasks'
});

module.exports = Task;